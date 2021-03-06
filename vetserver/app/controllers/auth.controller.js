const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const node = require("../config/nodemailer.config");
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}
exports.signup = (req, res) => {
    // Save User to Database

    User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            confirmationCode: makeid(20),
        })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User registered successfully!" });
                        node.sendConfirmationEmail(
                            user.username,
                            user.email,
                            user.confirmationCode
                        );
                    });
                })





            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "User registered successfully!" });
                    node.sendConfirmationEmail(
                        user.username,
                        user.email,
                        user.confirmationCode
                    );
                });
            }
        })

    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
    User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            if (user.status != "Active") {
                return res.status(401).send({
                    message: "Pending Account. Please Verify Your Email!",
                });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }


            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    accessToken: token,
                    status: user.status
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
exports.verifyUser = (req, res, next) => {
    User.findOne({
            where: { confirmationCode: req.params.confirmationCode, }

        })
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            user.status = "Active";
            user.save((err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ message: err });
                    return;
                };

            });
        })
        .catch((e) => console.log("error", e));
};
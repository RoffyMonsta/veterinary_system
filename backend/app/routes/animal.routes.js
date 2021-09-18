const { authJwt } = require("../middleware");
const controller = require("../controllers/animal.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/animal", controller.getAnimals);
    app.get("/api/animal/:id", controller.getAnimalById);
    app.post("/api/animal", controller.addAnimal);
};

const { authJwt } = require("../middleware");
const controller = require("../controllers/schedule.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/schedule/:id", controller.getSchedule);
    app.put("/api/schedule/:id", controller.addVisit);
};
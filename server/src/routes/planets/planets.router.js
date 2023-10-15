const express = require("express");
const { httpGetAllPlanets } = require("./planets.controller");
const planetsRouter = express.Router();

planetsRouter.get("/", httpGetAllPlanets); //lasd "planets.controller.js"
// azért "/" mert ez lesz a adatok routja!

module.exports = planetsRouter;

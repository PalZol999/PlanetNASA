const express = require("express");

const { httpGetAllPlanets } = require("./planets.controller");

const planetsRouter = express.Router(); //lasd "planets.controller.js"
// azért "/" mert ez lesz a adatok routja!

planetsRouter.get("/", httpGetAllPlanets);

module.exports = planetsRouter;

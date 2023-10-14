const express = require("express");
const { getAllPlanets } = require("./planets.controller");
const planetsRouter = express.Router();

planetsRouter.get("/planets", getAllPlanets); //lasd "planets.controller.js"
// azért /planets mert ez lesz a adatok routja!

module.exports = planetsRouter;

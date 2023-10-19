const express = require("express");  // 1/ hivod az Expresst
const {httpGetAllLunches, httpAddNewLaunch,httpAbortLaunch } = require ('./launches.controller')  // (a 3. lépéshez kell)


const lauchesRouter = express.Router(); // 2/ Express-el csinálsz egy router-t

lauchesRouter.get("/", httpGetAllLunches); // 3/ adsz neki cimet + h mit tartalmazzon (ami a contollerben van)
lauchesRouter.post("/", httpAddNewLaunch)
lauchesRouter.delete("/:id", httpAbortLaunch)

module.exports= lauchesRouter   // 4/ elérhetővé teszed

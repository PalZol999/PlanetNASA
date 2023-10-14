const express = require("express"); //minde express code-ot ide pakolunk h tiszta legyen a server file
const cors = require("cors");

const planetsRouter = require("./routes/planets/planets.router");
const app = express();

app.use(
  cors({
    orgigin: "http//localhost:3000",
  })
); // CORS midelwear
app.use(express.json()); //h ha a bejött adat = JSONnal...
app.use(planetsRouter); //akkor felhasználja a planetRouter => lásd "planet.router.js"

module.exports = app;

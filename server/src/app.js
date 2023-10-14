const express = require("express"); //minde express code-ot ide pakolunk h tiszta legyen a server file
const cors = require("cors");
const path= require('path')

const planetsRouter = require("./routes/planets/planets.router");
const app = express();

app.use(
  cors({
    orgigin: "http//localhost:3000",
  })
); // CORS midelwear
app.use(express.json()); //h ha a bejött adat = JSONnal...
app.use(express.static(path.join(__dirname, '..', 'public')))


app.use(planetsRouter); //akkor felhasználja a planetRouter => lásd "planet.router.js"
app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
} )

module.exports = app;

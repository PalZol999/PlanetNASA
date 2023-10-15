const express = require("express"); //minde express code-ot ide pakolunk h tiszta legyen a server file
const cors = require("cors");
const path= require('path')
const morgan=  require('morgan')

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter= require("./routes/launches/launches.router");
const app = express();

app.use(
  cors({
    orgigin: "http//localhost:3000",
  })
); // CORS sercurity related midelwear
app.use(morgan('combined'))


app.use(express.json()); //h ha a bejött adat = JSONnal...
app.use(express.static(path.join(__dirname, '..', 'public')))


app.use('/launches',launchesRouter)
app.use('/planets', planetsRouter); //akkor felhasználja a planetRouter => lásd "planet.router.js"
app.get('/*', (req,res)=>{
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
} )

module.exports = app;

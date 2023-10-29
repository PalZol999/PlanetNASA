const express = require("express"); //minde express code-ot ide pakolunk h tiszta legyen a server file
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const api = require("./routes/api");

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080", 
  })
);// CORS sercurity related midelwear
app.use(morgan("combined"));

app.use(express.json()); //h ha a bejött adat = JSONnal...
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/v1", api);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;

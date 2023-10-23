const http = require("http");
const mongoose = require("mongoose");
const { loadPlanetsData } = require("./models/planets.model");
const PORT = process.env.PORT || 8080;

const MONGO_URL =
  "mongodb+srv://nasa-api:IBM88ibm@nasacluster.e2djfza.mongodb.net/nasa?retryWrites=true&w=majority";

const app = require("./app");

const server = http.createServer(app); //itt a http-vel minden más midleweart beintegrál

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
    await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listen to port ${PORT}`);
  });
}

startServer();
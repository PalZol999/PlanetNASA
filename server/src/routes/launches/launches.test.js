const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");
const { loadPlanetsData } = require("../../models/planets.model");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
    await loadPlanetsData();
  });
  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET/launches", () => {
    test("it should respond with 200 success", async () => {
      const response = await request(app)
        .get("/launches") //supertest beintegrálja az expresst> app
        .expect(200)
        .expect("Content-Type", /json/);
    });
  });

  describe("Test POST/launches", () => {
    const completeLaunchData = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
      launchDate: "January 4, 2028",
    };

    const launchDataWithoutDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
    };

    const launchDataWithInvalidDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
      launchDate: "zoot",
    };

    test("it should respond with 201 success", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/) //checking the header
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf;
      const responseDate = new Date(response.body.launchDate).valueOf;
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("It shloud catch missing requird props", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/) //checking the header
        .expect(400);

      expect(response.body).not.toStrictEqual({
        error: "Missing required launch property",
      });
    });
    test("It shloud catch invalid dates", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/) //checking the header
        .expect(400);

      expect(response.body).not.toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});

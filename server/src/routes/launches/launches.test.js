const request = require("supertest");
const app = require("../../app");

describe("Test GET/launches", () => {
  test("it should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches") //supertest beintegrálja az expresst> app
      .expect(200)
      .expect("Content-Type", /json/);
  });
});

describe("Test POST/launches", () => {
  const completLaunchData = {
    mission: "ISS Entreprise",
    rocket: "NVVV 1070-1",
    target: "Kepler-186F",
    launchDate: "January 4, 2025",
  };

  const launchDataWithoutDate = {
    mission: "ISS Entreprise",
    rocket: "NVVV 1070-1",
    target: "Kepler-186F",
  };
  const launchDataWithInvalidDate = {
    mission: "ISS Entreprise",
    rocket: "NVVV 1070-1",
    target: "Kepler-186F",
    launchDate: "zoot",
  };

  test("it should respond with 201 success", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completLaunchData)
      .expect("Content-Type", /json/) //checking the header
      .expect(201);

    const requestDate = new Date(completLaunchData.launchDate).valueOf;
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

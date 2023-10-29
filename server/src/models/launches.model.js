const axios = require("axios");
const mongoose = require("mongoose");
const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function populateLaunches() {
  console.log("Downloading launch data...");
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    console.log("Problem downloading launch data");
    throw new Error("Launch data failed");
  }

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });
    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
    };

    console.log(`${launch.flightNumber} ${launch.mission}`);

    await saveLaunch(launch);
  }
}

async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  if (firstLaunch) {
    console.log("Launchdata already loaded");
  } else {
    await populateLaunches();
  }
}

async function findLaunch(filter) {
  return await launchesDatabase.findOne(filter);
}

async function existLaunchWithId(launchId) {
  return await findLaunch({
    flightNumber: launchId,
  });
}

async function getLatestFlightNumbers() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function getAllLunches(skip, limit) {
  return await launchesDatabase
  .find({}, { _id: 0, __v: 0 })
  .sort({flightNumber: 1})
  .skip(skip)
  .limit(limit);
}

async function saveLaunch(launch) {
  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function scheduleNewLaunch(launch) {
  const planet = await planets.findOne({
    kelplerName: launch.target,
  });

  if (!planet) {
    console.error("No matching planet found");
    return { success: false, error: "No matching planet found" };
  }
  const latestFlightNumber = await getLatestFlightNumbers();
  const newFlightNumber = latestFlightNumber + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["NASA", "ESA"],
    flightNumber: newFlightNumber,
  });
  console.log("New Launch:", newLaunch);

  await saveLaunch(newLaunch);

  // Update the flight number counter using Mongoose's connection
  const countersCollection = mongoose.connection.collection("counters");
  await countersCollection.updateOne(
    { _id: "flightNumber" },
    { $inc: { sequence_value: 1 } }
  );
  console.log("Flight Number Counter Updated");
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDatabase.updateOne({
    upcoming: false,
    success: false,
  });

  return aborted.modifiedCount === 1;
}
module.exports = {
  loadLaunchData,
  existLaunchWithId,
  getAllLunches,
  scheduleNewLaunch,
  abortLaunchById,
};

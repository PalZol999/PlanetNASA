const launches = new Map();
let lastestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  destination: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  succes: true,
};

launches.set(launch.flightNumber, launch);

function getAllLunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  lastestFlightNumber++;
  launches.set(lastestFlightNumber, Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['Zero to Mastery', 'NASA'],
    flightNumber: lastestFlightNumber
  }));
}

module.exports = {
  getAllLunches,
  addNewLaunch
};

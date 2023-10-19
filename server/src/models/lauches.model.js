const launches = new Map();
let lastestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  succes: true,
};

launches.set(launch.flightNumber, launch);

function existLaunchWithId(launchId){
  return launches.has(launchId)
}

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

function abortLaunchById(launchId) {
  const aborted= launches.get(launchId)
  aborted.upcoming= false
  aborted.success= false
  return aborted
  }

module.exports = {
  existLaunchWithId, // ???? 
  getAllLunches,
  addNewLaunch,
  abortLaunchById
  
};

// This is the error that I get: ReferenceError: abortLaunchById is not defined
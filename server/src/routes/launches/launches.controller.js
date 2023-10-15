const { getAllLunches, addNewLaunch } = require("../../models/lauches.model");

function httpGetAllLunches(req, res) {
  return res.status(200).json(getAllLunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.destination ||
    !launch.rocket ||
    !launch.launchDate
  ) {
    return res.status(400).json({
      error: 'Missing required launch props'
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)){
    return res.status(400).json({
      error:'Missing date'
    })
  }
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

module.exports = {
  httpAddNewLaunch,
  httpGetAllLunches,
};

const {
  getAllLunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById
} = require("../../models/lauches.model");

async function httpGetAllLunches(req, res) {
  return res.status(200).json(await getAllLunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.target ||
    !launch.rocket ||
    !launch.launchDate
  ) {
    return res.status(400).json({
      error: "Missing required launch props",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Missing date",
    });
  }
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!existLaunchWithId(launchId)) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  httpAddNewLaunch,
  httpGetAllLunches,
  httpAbortLaunch,
  //abortLaunchById,
  //existLaunchWithId
};

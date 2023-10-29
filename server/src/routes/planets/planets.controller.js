/*const { getAllPlanets } = require('../../models/planets.model');

async function httpGetAllPlanets(req, res) {
    return res.status(200).json(await getAllPlanets());

    // nagyon lecsupaszitva: res.json(planets)
}

module.exports= {
    httpGetAllPlanets
}*/

const { getAllPlanets } = require('../../models/planets.model');

async function httpGetAllPlanets(req, res) {
  try {
    const planets = await getAllPlanets();
    return res.status(200).json(planets);
  } catch (error) {
    console.error('Error in httpGetAllPlanets:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  httpGetAllPlanets
};

const mongoose = require("mongoose");

const launchsSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  target: {
    type: String,

  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success:  {
    type: Boolean,
    required: true,
    default: true,
  },
});

//connect launchsScheam with the "launches" collcetion (MongoDB collection are always plural)
module.exports= mongoose.model('Lauch', launchsSchema)
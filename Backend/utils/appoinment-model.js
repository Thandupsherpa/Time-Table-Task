const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_URI);

const appoinmentSchema = mongoose.Schema({
  userName: String,
  time: String,
  day: String,
  course: String,
});

module.exports = mongoose.model("Appoinment", appoinmentSchema);

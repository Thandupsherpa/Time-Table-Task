const express = require("express");
const cors = require("cors");
const Appoinment = require("./utils/appoinment-model");
require("dotenv").config();

const port = 3000;
const app = express();

// Enable CORS for all origins
app.use(cors()); // This will allow requests from any origin

// For JSON request bodies, you need to use express.json() middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/appointments-Data", async (req, res) => {
  console.log("POST request received at /appointments-Data");

  const { userName, time, day, course } = req.body;

  const newAppoinment = await Appoinment.create({
    userName,
    time,
    day,
    course,
  });

  res.sendStatus(201);
});

app.get("/get-Appoinment-Data", async (req, res) => {

  console.log("GET request received at /get-Appoin");
  

  const appoinments = await Appoinment.find({});

  res.json(appoinments);
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

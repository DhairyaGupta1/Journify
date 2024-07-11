const express = require("express");
const User = require("../db/index");
const Airline = require("../db/index");
const Flight = require("../db/index");
const adminAuth = require("../middleware/admin"); // Adjust the path as necessary
const router = express.Router();
const app = express();
app.use(express.json());
// Approve Airline
router.post("/admin/approveAirline/:airlineId", adminAuth, async (req, res) => {
  try {
    const airline = await Airline.findById(req.params.airlineId);
    if (!airline) return res.status(404).send("Airline not found");

    airline.approved = true;
    await airline.save();
    res.send("Airline approved");
  } catch (err) {
    res.status(400).send(err);
  }
});

// Approve Flight
router.post("/admin/approveFlight/:flightId", adminAuth, async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.flightId);
    if (!flight) return res.status(404).send("Flight not found");

    flight.approved = true;
    await flight.save();
    res.send("Flight approved");
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get All Users
router.get("/admin/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get All Airlines
router.get("/admin/airlines", adminAuth, async (req, res) => {
  try {
    const airlines = await Airline.find();
    res.send(airlines);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get All Flights
router.get("/admin/flights", adminAuth, async (req, res) => {
  try {
    const flights = await Flight.find().populate("airline");
    res.send(flights);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;

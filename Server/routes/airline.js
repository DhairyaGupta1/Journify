const express = require("express");

const { Airline } = require("../db/index");
const { Flight } = require("../db/index");
const bcrypt = require("bcryptjs");
const app = express();
app.use(express.json());
const router = express.Router();
// Airline SignUp
router.post("/airline/signup", async (req, res) => {
  try {
    const { airlineID, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAirline = new Airline({
      airlineID,
      email,
      password: hashedPassword,
    });
    await newAirline.save();
    res.status(201).send(newAirline);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Airline SignIn
router.post("/airline/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const airline = await Airline.findOne({ email });
    if (!airline) return res.status(404).send("Airline not found");

    const isMatch = await bcrypt.compare(password, airline.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    res.status(200).json({ msg: "Sign in successful" });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Add Flight
router.post("/airline/:airlineId/flight", async (req, res) => {
  try {
    const { flightNo, start, destination, startTime, endTime, fare } = req.body;
    const airline = await Airline.findById(req.params.airlineId);
    if (!airline) return res.status(404).send("Airline not found");

    const newFlight = new Flight({
      airline: airline._id,
      flightNo,
      start,
      destination,
      startTime,
      endTime,
      fare,
    });
    await newFlight.save();

    airline.flights.push(newFlight._id);
    await airline.save();

    res.status(201).send(newFlight);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update Flight
router.post("/airline/:airlineId/flight/:flightId/update", async (req, res) => {
  try {
    const { flightNo, start, destination, startTime, endTime, fare } = req.body;
    const flight = await Flight.findOneAndUpdate(
      { _id: req.params.flightId, airline: req.params.airlineId },
      { flightNo, start, destination, startTime, endTime, fare },
      { new: true }
    );
    if (!flight) return res.status(404).send("Flight not found");
    res.send(flight);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete Flight
router.post("/airline/:airlineId/flight/:flightId/delete", async (req, res) => {
  try {
    const flight = await Flight.findOneAndDelete({
      _id: req.params.flightId,
      airline: req.params.airlineId,
    });
    if (!flight) return res.status(404).send("Flight not found");

    const airline = await Airline.findById(req.params.airlineId);
    airline.flights.pull(flight._id);
    await airline.save();

    res.send("Flight deleted successfully");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/airline/:airlineId/flights", async (req, res) => {
  try {
    const flights = await Flight.find({ airline: req.params.airlineId });
    if (!flights) return res.status(404).send("Flights not found");
    res.send(flights);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get Flight by FlightNo
router.get("/airline/:airlineId/flight/:flightNo", async (req, res) => {
  try {
    const flight = await Flight.findOne({
      airline: req.params.airlineId,
      flightNo: req.params.flightNo,
    });
    if (!flight) return res.status(404).send("Flight not found");
    res.send(flight);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;

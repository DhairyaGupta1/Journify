const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../db/index");
const Flight = require("../db/index");
const userAuth = require("../middleware/user"); // Adjust the path as necessary
const router = express.Router();
const app = express();
app.use(express.json());
// User SignUp
router.post("/user/signup", async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, phone, password: hashedPassword });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// User SignIn
router.post("/user/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    res.send("SignIn successful");
  } catch (err) {
    res.status(400).send(err);
  }
});

// Cancel Flight Booking
router.post(
  "/user/:userId/flight/:flightId/cancel",
  userAuth,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) return res.status(404).send("User not found");

      user.bookedFlights.pull(req.params.flightId);
      await user.save();

      res.send("Flight booking canceled");
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

// Get All Available Flights
router.get("/flight/:flightId", async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.flightId).populate(
      "airline"
    );
    if (!flight || !flight.approved)
      return res.status(404).send("Flight not found");
    res.send(flight);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get Booked Flights
router.get("/user/:userId/bookedFlights", userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "bookedFlights"
    );
    if (!user) return res.status(404).send("User not found");
    res.send(user.bookedFlights);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get Flight Details
router.get("/flight/:flightId", async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.flightId).populate(
      "airline"
    );
    if (!flight) return res.status(404).send("Flight not found");
    res.send(flight);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;

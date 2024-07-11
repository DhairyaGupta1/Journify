const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://aakritimehrotra2022:AAKRITI%408oct@cluster0.gnp0cxr.mongodb.net/newDb?retryWrites=true&w=majority&appName=Cluster0/";

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bookedFlights: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

const AirlineSchema = new mongoose.Schema({
  airlineID: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  flights: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
    },
  ],
});

const Airline = mongoose.model("Airline", AirlineSchema);

const FlightSchema = new mongoose.Schema({
  airline: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airline",
    required: true,
  },
  flightNo: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const Flight = mongoose.model("Flight", FlightSchema);

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = {
  Admin,
  User,
  Flight,
  Airline,
};

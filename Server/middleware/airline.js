const Airline = require("../db/index"); // Adjust the path as necessary

const airlineAuth = (req, res, next) => {
  const username = req.headers.username;
  const password = req.headers.password;

  Airline.findOne({ username, password })
    .then((airline) => {
      if (airline) {
        req.airline = airline;
        next();
      } else {
        res
          .status(403)
          .json({ msg: "airline not found or invalid credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: "Server error", error: err });
    });
};

module.exports = airlineAuth;

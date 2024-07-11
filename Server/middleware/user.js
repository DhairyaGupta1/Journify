const { User } = require("../db/index"); // Adjust the path as necessary

const userAuth = (req, res, next) => {
  const email = req.headers.email;
  const password = req.headers.password;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password required" });
  }

  User.findOne({ email, password })
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(403).json({ msg: "User not found or invalid credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: "Server error", error: err });
    });
};

module.exports = userAuth;

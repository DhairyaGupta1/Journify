const Admin = require("../db/index"); // Adjust the path as necessary

const adminAuth = (req, res, next) => {
  const username = req.headers.username;
  const password = req.headers.password;

  Admin.findOne({ username, password })
    .then((admin) => {
      if (admin) {
        req.admin = admin;
        next();
      } else {
        res.status(403).json({ msg: "Admin not found or invalid credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: "Server error", error: err });
    });
};

module.exports = adminAuth;

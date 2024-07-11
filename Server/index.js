const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const app = express();
app.use(bodyParser.json());

const userRoutes = require("./routes/user");
const airlineRoutes = require("./routes/airline");
const adminRoutes = require("./routes/admin");

app.use("/user", userRoutes);
app.use("/airline", airlineRoutes);
app.use("/admin", adminRoutes);

const PORT = 3030;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

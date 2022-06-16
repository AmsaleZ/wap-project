require("./cars");
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", function () {
  console.log("Mongoose connected to " + process.env.DB_NAME);
});
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});
mongoose.connection.on("error", function (err) {
  console.log("Mongoose connection error " + err);
});

require("dotenv").config();
require("./api/data/db.js");
const express = require("express");
const carRouter = require("./api/routes/carRouter");
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');

app.set("port", process.env.PORT);

app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as templating engine 
app.set("view engine", "html");
app.engine('html', ejs.renderFile);

app.use("/", carRouter);

const server = app.listen(app.get("port"), function () {
  console.log("Listening to port", server.address().port);
});
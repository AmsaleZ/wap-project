const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const cookieParser = require('cookie-parser');
const username = process.env.LOGIN_USERNAME;
const password = process.env.LOGIN_PASSWORD;
let loggedIn = false;

router.use((req, res, next) => {
  loggedIn = req.cookies['isLoggedIn'];
  next();
});

router.route("/login/")
  .get((req, res) => {
    if (loggedIn)
      res.redirect("/cars");
    else
      res.render("login");
  })
  .post((req, res) => {
    if (req.body.username == username && req.body.password == password) {
      res.cookie("isLoggedIn", true);
      res.redirect("/cars");
    } else {
      res.cookie("isLoggedIn", false);
      res.redirect("/login");
    }
  });

router
  .route("/cars/")
  .get((req, res) => {
    if (loggedIn)
      return carController.getCarsPage(req, res)
    else
      res.redirect("/login");
  })

router
  .route("/allCars")
  .get((req, res) => {
    if (loggedIn)
      return carController.getAllCars(req, res)
    else
      res.redirect("/login");
  })

router
  .route("/addCar")
  .get((req, res) => {
    if (loggedIn)
      return carController.getAddCarPage(req, res)
    else
      res.redirect("/login");
  })
  .post(carController.addNewCar);
  
router
  .route("/addCar/:id")
  .get((req, res) => {
    if (loggedIn)
      return carController.getAddCarPage(req, res)
    else
      res.redirect("/login");
  })

router
  .route("/getCarDetail")
  .post((req, res) => {
    if (loggedIn)
      return carController.getCarDetail(req, res)
    else
      res.redirect("/login");
  });

  router
  .route("/updateCar")
  .post((req, res) => {
    if (loggedIn)
      return carController.updateCar(req, res)
    else
      res.redirect("/login");
  })

router
  .route("/deleteCar")
  .post((req, res) => {
    if (loggedIn)
      return carController.deleteCar(req, res)
    else
      res.redirect("/login");
  })

router.use((req, res, next) => {
  res.render("404")
})

module.exports = router;
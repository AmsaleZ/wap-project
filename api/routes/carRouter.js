const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const cookieParser = require('cookie-parser');
const username = process.env.LOGIN_USERNAME;
const password = process.env.LOGIN_PASSWORD;
let loggedIn = false;
let rememberMe = false;

//Middleware to check if user logged in before
//if user logged in before it has the values 
router.use((req, res, next) => {
  loggedIn = req.cookies['isLoggedIn'];
  rememberMe = req.cookies['rememberMe'];
  //loggedIn expires with session
  //rememberMe expires one year later
  if(rememberMe) {
    loggedIn = true;
    res.cookie('isLoggedIn', true);
  }
  next();
});

//if the root is / it checks if logged in and redirects to cars page or login page
router.route("/").get((req, res) => {
  if (loggedIn)
    res.redirect("/cars")
  else
    res.redirect("/login");
})

router.route("/login/")
  .get((req, res) => {
    if (loggedIn)
      res.redirect("/cars");
    else
      res.render("login", {error: null});
  })
  .post((req, res) => {
    //Sign in method
    if (req.body.username == username && req.body.password == password) {
      //if username and password is correct
      res.cookie("isLoggedIn", true);
      if(req.body.rememberMe == 'true') {
        let oneYear = 365 * 24 * 3600 * 1000;
        res.cookie("rememberMe", true, {maxAge : oneYear, expires: new Date(Date.now() + oneYear)});
      }else {
        res.clearCookie('rememberMe');
      }
      res.redirect("/cars");
    } else {
      //if username or password is not correct it gives the error message in login page
      res.clearCookie('isLoggedIn');
      res.clearCookie('rememberMe');
      res.render("login", {error: "Username or password is wrong!"});
    }
  });

  router
  .route('/logout')
  .get((req, res) => {
    loggedIn = null;
    res.clearCookie('isLoggedIn');
    res.clearCookie('rememberMe');
    res.redirect("/login")
  })

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
    //just renders the page
    if (loggedIn)
      return carController.getAddCarPage(req, res)
    else
      res.redirect("/login");
  })
  .post(carController.addNewCar); //for the addCar form
  

  //Edit Car Page to render
router
  .route("/addCar/:id")
  .get((req, res) => {
    if (loggedIn)
      return carController.getAddCarPage(req, res)
    else
      res.redirect("/login");
  })

    //Edit Car to get the data for that specific car
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
  if (loggedIn)
    res.render("404")
  else
    res.redirect("/login")
  })

module.exports = router;
const mongoose = require("mongoose");
const Car = mongoose.model(process.env.DB_TEAM_MODEL);
const messageHandler = require("./messageHandler");

const addNewCar = function (req, res) {
  let newCar = req.body;
  console.log("newCar",newCar)
  Car.create(newCar)
    .then((car) => 
      {
        res.send({success: "New Car ADDED"})
          // messageHandler.setResponseAndSend(res, car, process.env.SUCCESS_MESSAGE)
      }
    )
    .catch((error) => 
    {
      console.log("error", error)
      // messageHandler.setResponseAndSend(res, error, process.env.ERROR_MESSAGE)
    }
    );
};

const getCarsPage = function(req, res) {
  res.render("cars");
}

const getAddCarPage = function(req, res) {
  res.render("addCar");
}

const getAllCars = function (req, res) {
  Car.find()
    .exec()
    .then((cars) =>
      {
        res.send({cars: cars.map(x => [x.newOrUsed, x.distance, x.make, x.model, x.zip, x._id])});
        // return messageHandler.setResponseAndSend(res, cars, process.env.SUCCESS_MESSAGE)
      }
    )
    .catch((error) =>
      messageHandler.setResponseAndSend(res, error, process.env.ERROR_MESSAGE)
    );
};

const getCarDetail = function (req, res) {
  Car.findById(req.body.id)
    .exec()
    .then((car) =>
      {
        res.send({car})
        // return messageHandler.setResponseAndSend(res, cars, process.env.SUCCESS_MESSAGE)
      }
    )
    .catch((error) =>
      messageHandler.setResponseAndSend(res, error, process.env.ERROR_MESSAGE)
    );
};

const updateCar = function (req, res) {
  const newOrUsed = req.body.newOrUsed;
  const distance = req.body.distance;
  const make = req.body.make;
  const model = req.body.model;
  const zip = req.body.zip;
  Car.findByIdAndUpdate(req.body.id, { newOrUsed, distance, make, model, zip})
  .exec()
  .then((car) =>
    {
      res.send({success: "CAR UPDATED"})
      // return messageHandler.setResponseAndSend(res, cars, process.env.SUCCESS_MESSAGE)
    }
  )
  .catch((error) =>
    messageHandler.setResponseAndSend(res, error, process.env.ERROR_MESSAGE)
  );
}

const deleteCar = function (req, res) {
  const newOrUsed = req.body.newOrUsed;
  const distance = req.body.distance;
  const make = req.body.make;
  const model = req.body.model;
  const zip = req.body.zip;
  Car.deleteOne({_id: req.body.id})
  .exec()
  .then((car) =>
    {
      res.send({success: "CAR DELETED"})
      // return messageHandler.setResponseAndSend(res, cars, process.env.SUCCESS_MESSAGE)
    }
  )
  .catch((error) =>
    messageHandler.setResponseAndSend(res, error, process.env.ERROR_MESSAGE)
  );
}
module.exports = {
  addNewCar,
  getAllCars,
  getCarsPage,
  getAddCarPage,
  getCarDetail,
  updateCar,
  deleteCar
};

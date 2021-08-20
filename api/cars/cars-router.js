const express = require("express");
const Cars = require("./cars-model");
const router = express.Router();
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require("./cars-middleware");

router.get("/", async (req, res, next) => {
    try{
        const cars = await Cars.getAll();
        res.json(cars);
    }catch(err){
        next(err);
    }
});

router.get("./:id", checkCarId, (req, res) =>{
    res.json(req.car);
});

router.post("/", checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    const {vin, make, model, mileage, title, transmission} = req.body
    try{
        const car = await Cars.create(vin, make, model, mileage, title, transmission);
        res.status(201).json(car);
    }catch(err){
        next(err);
    }
});

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });

  module.exports = router;

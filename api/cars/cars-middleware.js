const Cars = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try{
    const car = await Cars.getById(req.params.id);

    if(!car){
      next({ status: 404, message: `car with id ${req.params.id} is not found` })
    }else{
      req.car = car;
      next();
    }
  }catch(err){
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  const error = { status: 400 }
  const {vin, make, model, mileage} = req.body
  try{
    if(vin === undefined){
      error.message= `vin is missing`;
    }else if(make === undefined){
      error.message= `make is missing`;
    }else if(model === undefined){
      error.message= `model is missing`;
    }else if(mileage === undefined){
      error.message= `mileage is missing`;
    }

    if(error.message){
      next(error);
    }else{
      next();
    }
  }catch(err){
    next(err);
  }
};

const checkVinNumberValid = (req, res, next) => {
  if (vinValidator.validate(req.body.vin)){
    next();
  }else{
    next({ 
      status: 400,
      message: `vin ${req.body.vin} is invalid`
    })
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try{
    const existingVin = await Cars.checkUnique(req.body.vin);
    if(!existingVin){
      next()
    }else{
      next({ 
        status: 400,
        message: `vin ${req.body.vin} already exists`
      })
    }
  }catch(err){
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
};
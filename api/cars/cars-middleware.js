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
}

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
}

const checkVinNumberValid = async (req, res, next) => {
  const isValid = await vinValidator.validate(req.body.vin)
try{
  if(isValid){
    next();
  }else{
    next({ status: 404, message: `vin ${req.body.vin} is invalid` })
  }
}catch(err){
  next(err);
}
}

const checkVinNumberUnique = async (req, res, next) => {
  const {vin} = req.body;

  try{
    const checkedVin = await Cars.checkUnique(vin);

    if(checkedVin){
      next({ status: 400, message: `vin ${vin} already exists` })
    }else{
      next();
    }
  }catch(err){
    next(err);
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
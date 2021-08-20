const db = require("../../data/db-config");

const getAll = () => {
  return db("cars");
}

const getById = (id) => {
  return db("cars").where("id", id).first();
}

const create = async ({ vin, make, model, mileage, title, transmission  }) => {
  const [id] = await db("cars").insert({ vin, make, model, mileage, title, transmission });
  return getById(id);
}

const checkUnique = async (vin) => {
  const checkedVin = await db("cars").where("vin", vin).first();
  return checkedVin; 
}


module.exports = {
  getAll,
  getById,
  create,
  checkUnique
}
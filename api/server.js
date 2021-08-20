const express = require("express")

const CarsRouter = require("./cars/cars-router");

const server = express();

server.use(express.json());

server.use("/api/cars", CarsRouter);

server.use("*", (req, res) => {
    res.status(404).json({
        message: "Invalid Endpoint - Use /api/accounts"
    });
});

module.exports = server

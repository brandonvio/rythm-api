rabbit = require("../_rabbit");
controller = {};

controller.getInstruments = async (req, res) => {
    const data = ["EUR_USD", "USD_JPY"];
    res.send(data);
};

controller.getIntervals = async (req, res) => {
    const data = ["5S", "M1", "M2"];
    res.send(data);
};

controller.getTraderStatus = async (req, res) => {
    const data = {
        status: "running",
        total_trades: 100
    };
    res.send(data);
};

controller.startTrader = async (req, res) => {
    body = req.body;
    console.log(body);
    rabbit.startTrader(body);
    res.sendStatus(200);
};

module.exports = controller;

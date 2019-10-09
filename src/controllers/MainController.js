rabbit = require("../_rabbit");
redis = require("../_redis");
controller = {};

controller.getInstruments = async (req, res) => {
  try {
    const data = await redis.getInstruments();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
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

rabbit = require("../_rabbit");
RedisService = require("../_redis");
controller = {};

controller.getInstruments = async (req, res) => {
  try {
    redisService = new RedisService();
    const data = await redisService.getInstruments();
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

controller.testRabbit = async (req, res) => {
  // 10.0.188.51
  rabbit.testRabbit();
  res.sendStatus(200);
};

controller.testRedis = async (req, res) => {
  // 10.0.188.51
  redisService = new RedisService();
  await redisService.testRedis();
  res.sendStatus(200);
};

module.exports = controller;

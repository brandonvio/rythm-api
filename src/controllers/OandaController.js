const _oandaApi = require("./_oandaApi");
const _redis = require("../_redis");
controller = {};

controller.getAccount = async (req, res) => {
  try {
    const url = _oandaApi.accountsUrl();
    const data = await _oandaApi.get(url);
    res.send(data.account);
  } catch (exception) {
    res.sendStatus(500);
  }
};

controller.getInstruments = async (req, res) => {
  try {
    const url = _oandaApi.instrumentsUrl();
    const data = await _oandaApi.get(url);
    const instruments = data.instruments;
    for (inst of instruments) {
      // price = await _redis.getAsync(`PRICEJ_${inst.name}`);
      // console.log(inst.name, price);

      // if (price) {
      //   price = JSON.parse(price);
      //   inst.ask = price.ask;
      //   inst.bid = price.bid;
      //   inst.spread = price.spread;
      // }

      inst.ask = 0;
      inst.bid = 0;
      inst.spread = 0;
    }
    res.send(instruments);
  } catch (exception) {
    res.sendStatus(500);
  }
};

controller.getInstrumentr = async (req, res) => {
  try {
    const url = _oandaApi.instrumentsUrl();
    const data = await _oandaApi.get(url);
    const instruments = data.instruments;
    for (inst of instruments) {
      price = await _redis.getAsync(`PRICEJ_${inst.name}`);
      console.log(inst.name, price);

      if (price) {
        price = JSON.parse(price);
        inst.ask = price.ask;
        inst.bid = price.bid;
        inst.spread = price.spread;
      }

      inst.ask = 0;
      inst.bid = 0;
      inst.spread = 0;
    }
    res.send(instruments);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = controller;

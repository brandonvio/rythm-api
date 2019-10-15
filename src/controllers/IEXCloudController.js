const RedisService = require("../_redis");
const iex = require("iexcloud_api_wrapper");
const axios = require("axios");

const red = new RedisService();
const controller = {};

controller.getQuote = async (req, res) => {
  const quoteData = await iex.quote("TSLA");
  console.log(quoteData);
  res.send(data);
};

controller.getCryptoSymbols = async (req, res) => {
  const url =
    "https://cloud.iexapis.com/stable/ref-data/crypto/symbols?token=sk_b309769b93d246f597dc430b194e2a28";
  const { data } = await axios.get(url);
  console.log(data);
  res.send(data);
};

controller.getSymbols = async (req, res) => {
  const list = await red.list("iexcloud_market_symbols");

  if (list.length > 0) {
    jsonList = list.map(item => JSON.parse(item));
    res.send(jsonList);
  } else {
    const data = await iex.marketSymbols();
    for (symbol of data) {
      await red.rpush("iexcloud_market_symbols", JSON.stringify(symbol));
    }
    console.log(list);
    res.send(data);
  }
};

module.exports = controller;

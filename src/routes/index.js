const express = require("express");
const router = express.Router();
const mainController = require("../controllers/MainController");
const oandaController = require("../controllers/OandaController");

router.get("/intervals", mainController.getIntervals);
router.post("/trader/start", mainController.startTrader);
router.get("/trader/status", mainController.getTraderStatus);
router.get("/account", oandaController.getAccount);
router.get("/instruments", oandaController.getInstruments);
router.get("/instrumentr", mainController.getInstruments);
router.get("/testrabbit", mainController.testRabbit);
router.get("/testredis", mainController.testRedis);

// router.get("/instruments", InstrumentController.getInstruments);
// router.get("/candles/summary", InstrumentController.getCandleSummary);
// router.get("/candles/summary", InstrumentController.getCandleSummary);
// router.post("/candles", InstrumentController.getCandles);
// router.post("/sparkline", InstrumentController.getCloseSparkline);

module.exports = router;

const express = require("express");
const router = express.Router();
// const InstrumentController = require("../controllers/InstrumentController");
const mainController = require("../controllers/MainController");
const oandaController = require("../controllers/OandaController");
//Middle ware that is specific to this router
// router.use(function timeLog(req, res, next) {
//     console.log("Time: ", Date.now());
//     next();
// });

router.get("/instruments", mainController.getInstruments);
router.get("/intervals", mainController.getIntervals);
router.post("/trader/start", mainController.startTrader);
router.get("/trader/status", mainController.getTraderStatus);
router.get("/account", oandaController.getAccount);

// router.get("/instruments", InstrumentController.getInstruments);
// router.get("/candles/summary", InstrumentController.getCandleSummary);
// router.get("/candles/summary", InstrumentController.getCandleSummary);
// router.post("/candles", InstrumentController.getCandles);
// router.post("/sparkline", InstrumentController.getCloseSparkline);

module.exports = router;

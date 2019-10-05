const _oandaApi = require("./_oandaApi");
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
            console.log(inst);
            inst.ask = 0;
            inst.bid = 0;
        }
        res.send(instruments);
    } catch (exception) {
        res.sendStatus(500);
    }
};

module.exports = controller;

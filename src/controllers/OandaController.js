const _oandaApi = require("./_oandaApi");
controller = {};

controller.getAccount = async (req, res) => {
    try {
        const url = _oandaApi.accountsUrl();
        const data = _oandaApi.get(url);
        res.send(data);
    } catch (exception) {
        res.sendStatus(500);
    }
};

module.exports = controller;

const axios = require("axios");

oandaApi = {};
const accountId = process.env.OANDA_DEFAULT_ACCOUNT;
const token = process.env.OANDA_TOKEN;
const domain = process.env.OANDA_TRADE_DOMAIN;

oandaApi.get = async url => {
    try {
        var config = {
            headers: { Authorization: "Bearer " + token }
        };
        const { data } = await axios.get(url, config);
        console.log(data);
        return data;
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
};

oandaApi.accountsUrl = () => {
    const url = `https://${domain}/v3/accounts/${accountId}`;
    return url;
};

oandaApi.instrumentsUrl = () => {
    const url = `https://${domain}/v3/accounts/${accountId}/instruments`;
    return url;
};

module.exports = oandaApi;

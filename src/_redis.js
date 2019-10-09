const { promisify } = require("util");
const redis = require("redis");

const redis_domain = process.env.REDIS_DOMAIN;
const redis_password = process.env.REDIS_PASSWORD;

_redis = {};

_redis.client = redis.createClient({
  host: redis_domain,
  password: redis_password
});

_redis.getAsync = promisify(_redis.client.get).bind(_redis.client);
_redis.keysAsync = promisify(_redis.client.keys).bind(_redis.client);
_redis.hmgetAsync = promisify(_redis.client.hmget).bind(_redis.client);

_redis.getInstruments = async () => {
  const instrument_keys = await _redis.keysAsync("INSTRUMENT*");
  const list = [];
  for (key of instrument_keys) {
    let instrument_data = JSON.parse(await _redis.getAsync(key));
    let price = JSON.parse(
      await _redis.getAsync(`PRICEJ_${instrument_data.name}`)
    );
    instrument_data.ask = price.ask;
    instrument_data.bid = price.bid;
    instrument_data.spread = price.spread;
    list.push(instrument_data);
  }
  return list;
};

module.exports = _redis;

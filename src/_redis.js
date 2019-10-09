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
  const instruments = await _redis.keysAsync("INSTRUMENT*");
  const list = [];
  for (ins of instruments) {
    let _ins = JSON.parse(await _redis.getAsync(ins));
    // const key = `PRICEJ_${_ins.name}`;
    // console.log(key);
    let price = JSON.parse(await _redis.getAsync(`PRICEJ_${_ins.name}`));
    console.log(_ins);
    console.log(price);
    _ins.ask = price.ask;
    _ins.bid = price.bid;
    _ins.spread = price.spread;
    console.log(_ins);
    list.push(_ins);
  }
  return list;
};

module.exports = _redis;

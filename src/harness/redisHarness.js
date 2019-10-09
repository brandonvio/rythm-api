const { promisify } = require("util");
const redis = require("redis");
const REDIS_DOMAIN = "192.168.1.102";
const REDIS_PASSWORD = "adminadmin";

_redis = {};
_redis.client = redis.createClient({
  host: REDIS_DOMAIN,
  password: REDIS_PASSWORD
});

_redis.getAsync = promisify(_redis.client.get).bind(_redis.client);
_redis.keysAsync = promisify(_redis.client.keys).bind(_redis.client);
_redis.hmgetAsync = promisify(_redis.client.hmget).bind(_redis.client);

getInstruments = async () => {
  const instruments = await _redis.keysAsync("INSTRUMENT*");
  const list = [];
  for (ins of instruments) {
    const inst_detail = await _redis.getAsync(ins);
    list.push(JSON.parse(inst_detail));
  }
  return list;
};

getInstruments().then(result => {
  console.log(result);
});

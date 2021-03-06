const { promisify } = require("util");
const _ = require("lodash");
const redis = require("redis");

const redis_domain = process.env.REDIS_DOMAIN;
const redis_password = process.env.REDIS_PASSWORD;

class RedisService {
  constructor() {
    this.client = this.getRedisClient();
  }

  getRedisClient() {
    const client = {};
    const _client = redis.createClient({
      host: redis_domain,
      password: redis_password
    });
    client.setAsync = promisify(_client.set).bind(_client);
    client.getAsync = promisify(_client.get).bind(_client);
    client.keysAsync = promisify(_client.keys).bind(_client);
    client.hmgetAsync = promisify(_client.hmget).bind(_client);
    client.hmgetAsync = promisify(_client.hmget).bind(_client);
    client.llenAsync = promisify(_client.llen).bind(_client);
    client.lrangeAsync = promisify(_client.lrange).bind(_client);
    client.rpushAsync = promisify(_client.rpush).bind(_client);

    return client;
  }

  async llen(key) {
    return await this.client.llenAsync(key);
  }

  async rpush(key, value) {
    return await this.client.rpushAsync(key, value);
  }

  async list(key) {
    const len = (await this.llen(key)) - 1;
    if (len > 0) {
      const list = this.client.lrangeAsync(key, 0, len);
      return list;
    } else {
      return [];
    }
  }

  async getInstruments() {
    const _redis = this.client;
    const instrument_keys = await _redis.keysAsync("INSTRUMENT*");
    let list = [];
    for (let key of instrument_keys) {
      let instrument_data = JSON.parse(await _redis.getAsync(key));
      let price = JSON.parse(
        await _redis.getAsync(`PRICEJ_${instrument_data.name}`)
      );
      instrument_data.ask = price.ask;
      instrument_data.bid = price.bid;
      instrument_data.spread = price.spread;
      list.push(instrument_data);
    }

    list = _.orderBy(list, ["name"], ["asc"]);

    console.log(list);
    return list;
  }

  async testRedis() {
    const _redis = this.client;
    await _redis.setAsync("hi", "Hello World! From f'ing Redis!");

    const value = await _redis.getAsync("hi");
    console.log(value);
  }
}

module.exports = RedisService;

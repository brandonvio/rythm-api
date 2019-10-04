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

module.exports = _redis;

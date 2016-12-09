const redis = require('redis');

class RedisStorage {
  constructor(client) {
    if ( client && typeof client.constructor == 'function' && client.constructor.name == 'RedisClient' ) {
      this.client = client;
    }
    else {
      this.client = redis.createClient.apply(null, arguments);
    }
  }

  set(key, val) {
    return new Promise((resolve, reject) => {
      if ( val === undefined ) {
        this.client.del(key);
        return resolve();
      }
      this.client.set(key, JSON.stringify(val), (err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, val) => {
        err ? reject(err) : resolve( JSON.parse(val) );
      });
    });
  }
}

module.exports = RedisStorage;

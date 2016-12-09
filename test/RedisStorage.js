const RedisStorage = require('../lib/RedisStorage');
const redis = require('redis');
const assert = require('assert');

describe('RedisStorage', () => {
  context('constructor', () => {
    var _RedisCreateClient;

    before(() => {
      // Stub
      _RedisCreateClient = redis.createClient;
      redis.createClient = function(url) {
        return new function RedisClient() { this.url = url; };
      };
    });

    after(() => {
      redis.createClient = _RedisCreateClient;
    });

    it('can create instance from redis client', () => {
      const client = redis.createClient('redis://foo');
      const storage = new RedisStorage(client);
      assert.equal(storage.client.url, 'redis://foo');
    });

    it('can create instance from redis url', () => {
      const storage = new RedisStorage('redis://foo');
      assert.equal(storage.client.url, 'redis://foo');
    });
  });
});

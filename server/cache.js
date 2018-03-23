"use strict";

const redis = require('async-redis');


class Cache {
    async withConnection(action, callback) {
        try
        {
            if (!this.client) {
                this.client = redis.createClient();                    
                this.client.on('error', (error) => {
                    console.log(`REDIS error: ${error}`);
                    if (this.client) {
                        let client = this.client;
                        this.client = null;
                        client.quit();                    
                    }
                });
            }
            return await callback(this.client);
        } catch (error) {
            try {
                console.log(`REDIS error on '${action}': ${error}`);
              
                if (this.client) {
                    let client = this.client;
                    this.client = null;
                    client.quit();                    
                }
            } catch (errorOnClose) {
                console.log(`REDIS: error closing failed connection: ${errorOnClose}`);
            }
            throw error;
        }
    }


    async get(key) { return await this.withConnection("get", async client => await client.get(key)); }
    async hget(key, field) { return await this.withConnection("hget", async client => await client.hget(key, field)); }
    async hset(key, field, value) { return await this.withConnection("hset", async client => await client.hset(key, field, value)); }
    async hsetnx(key, field, value) { return await this.withConnection("hsetnx", async client => await client.hsetnx(key, field, value)); }
}

module.exports = Cache;
"use strict";

const uuid = require('uuid/v1');


class DataStore {
    constructor(cache) {
        this.cache = cache;
    }


    async createSession(userId) {
        const sessionId = uuid();

        return (await this.cache.hset('session', userId, sessionId))? userId + '|' + sessionId: null;
    }


    async createUser(username, password) {
        let result = null;

        if (username && password) {
            const userId = uuid();

            if (await this.cache.hsetnx('login', username, userId + '|' + password)) {
                if (await this.cache.hsetnx('user', userId, JSON.stringify({}))) {
                    result = userId;
                }
            }
        }
        return result;
    }


    async getUser(sessionKey) {
        const decoded = sessionKey? sessionKey.split('|'): [];
        let result = null;

        if (decoded && decoded.length === 2) {
            const userId = decoded[0];
            const sessionId = decoded[1];

            const storedSessionId = (userId && sessionId)?
                await this.cache.hget('session', userId):
                null;

            if (storedSessionId == sessionId) {
                const json = await this.cache.hget('user', userId)

                if (json) {
                    result = JSON.parse(json);
                }
            }
        }
        return result;
    }


    async getUserId(username, password) { 
        const encoded = (username && password)? await this.cache.hget('login', username): null;
        let result = null;

        if (encoded) {
            const decoded = encoded.split('|');

            if (decoded && decoded.length === 2) {
                const userId = decoded[0];
                const storedPassword = decoded[1];

                if (userId && password === storedPassword) {
                    result = userId;
                }
            }
        }
        return result;
    }
}


module.exports = DataStore;
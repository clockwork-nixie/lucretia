"use strict";


class Api {
    constructor(datastore) {
        this.datastore = datastore;
        this.registerRoutes = this.registerRoutes.bind(this)
    }


    registerApi(get, post) {
        const self = this;

        get('/api/login', async (request, response) => {
            const username = request.query.username;
            const password = request.query.password;
            const userId = await self.datastore.getUserId(username, password);
            const sessionKey = userId? await self.datastore.createSession(userId): null;

            if (sessionKey) {
                response.send(JSON.stringify({ sessionKey: sessionKey }));
            } else {
                response.sendStatus(401);
            }
        }, { allowAnonymous: true });


        get('/api/register', async (request, response) => {
            const username = request.query.username;
            const password = request.query.password;
            const userId = await self.datastore.createUser(username, password);
            let sessionKey = null;
            
            if (userId) {
                sessionKey = await self.datastore.createSession(userId);
            }

            if (sessionKey) {
                response.send(JSON.stringify({ sessionKey: sessionKey }));
            } else {
                response.sendStatus(409);
            }
        }, { allowAnonymous: true });


        get('/api/test', (request, response) =>
            response.send(JSON.stringify({ foo: 'bar' })));
    }


    registerRoutes(application) {
        const self = this;

        const authenticate = (method, route, action, allowAnonymous) =>
            method(route, async (request, response) => {
                try {
                    let user = null;

                    if (!allowAnonymous) {
                        const sessionKey = request.query.sessionKey; // TODO: should come from a header instead.
                        const user = sessionKey? await self.datastore.getUser(sessionKey): null;

                        if (!user) {
                            response.sendStatus(401);
                            return;
                        }
                    }
                    await action(request, response, user);
                } catch (error) {
                    console.log(`API(${route}): ${error}`);
                    console.log(error);
                    response.sendStatus(500);
                }    
            });

        const get = (route, action, { allowAnonymous = false } = {}) =>
            authenticate(application.get.bind(application), route, action, allowAnonymous);
        const post = (route, action, { allowAnonymous = false } = {}) =>
            authenticate(application.post.bind(application), route, action, allowAnonymous);

        this.registerApi(get, post);
    }
}


module.exports = Api;

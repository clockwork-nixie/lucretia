"use strict";


function api(application) {
    application.get('/api/test', (request, response) =>
        response.send(JSON.stringify({ foo: 'bar' })));
}


module.exports = api;
  
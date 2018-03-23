'use strict';

const Api = require('./api');
const Cache = require('./cache')
const DataStore = require("./datastore")
const fs = require('fs');
const nconf = require('nconf').argv().file({ file: 'server.config.json' });
const Webserver = require('./webserver');

const configuration = {
    isSystest: nconf.get('systest') === "true",
    webserver: {
        certificate: nconf.get('certificate'),
        port: nconf.get('port'),
        sslPort: nconf.get('sslPort')
    }
};

const api = new Api(new DataStore(new Cache()));
const application = new Webserver({ isDebug: configuration.isSystest });


application.configure(api.registerRoutes);
application.serve('public');
application.use((request, response) => response.sendStatus(404));


if (configuration.webserver.certificate) {
    if (fs.existsSync(configuration.webserver.certificate)) {
        application.listen({
            certificate: configuration.webserver.certificate,
            port: configuration.webserver.sslPort
        });
    } else {
        console.log("WARNING: HTTPS certificate missing - running as HTTP only.")
    }
}
application.listen({ port: configuration.webserver.port });

console.log(`APPLICATION: started worker ${process.pid}.`);

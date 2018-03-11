'use strict';

const fs = require('fs');

const HTTPS_CERTIFICATE = "/etc/letsencrypt/live/lucretia.org.uk"

const api = require('./src/api');
const webserver = require('./src/webserver');
const application = new webserver({ isDebug: true });


application.configure(api);
application.serve('public');
application.use((request, response) => response.sendStatus(404));


if (fs.existsSync(HTTPS_CERTIFICATE)) {
    application.listen({ certificate: HTTPS_CERTIFICATE });
} else {
    console.log("APPLICATION: no certificate - skipping HTTPS");
}
application.listen();

console.log(`APPLICATION: started worker ${process.pid}.`);

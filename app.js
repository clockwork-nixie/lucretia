'use strict';

(function () {
  const express = require('express');
  const application = express();


  application.use(express.static('public'));


  application.get('/api/test', function (request, response) {
  	response.send(JSON.stringify({ foo: 'bar' }));
  });


  application.use(function (request, response) {
      response.sendStatus(404);
  });


  application.listen(
    process.env.NODE_PORT || 3000,
    function () { console.log(`START: started worker ${process.pid}.`);
  });
})();

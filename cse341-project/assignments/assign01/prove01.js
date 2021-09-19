const http = require('http');

const routes = require('./prove01-routes.js');

const server = http.createServer(routes.handler);

//thousand port are safe
server.listen(3000);
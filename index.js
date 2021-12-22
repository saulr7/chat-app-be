const Server = require('./services/Server');

require('dotenv').config();

const server = new Server();

server.execute();

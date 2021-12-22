const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const authRoutes = require('../routes/auth');
const messageRoutes = require('../routes/message');

const Sockets = require('./sockets');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    dbConnection();

    this.server = http.createServer(this.app);

    this.io = socketio(this.server);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, '../public')));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/message', messageRoutes);
  }

  configurarSockets() {
    // eslint-disable-next-line no-new
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();

    this.configurarSockets();

    this.server.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Running at PORT: ${this.port}`);
    });
  }
}

module.exports = Server;

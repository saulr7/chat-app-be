const {
  userConnected, userDisconnected, getUsers, saveMessage,
} = require('../controllers/sockets');
const { verifyJWT } = require('./jwt');

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', async (socket) => {
      const token = socket.handshake.query['x-token'];
      const [valid, uid] = verifyJWT(token);

      // eslint-disable-next-line no-console
      console.log('client connected');

      if (!valid) {
        // eslint-disable-next-line no-console
        console.log('socket no found', uid);
        socket.disconnect();
        return;
      }

      await userConnected(uid);

      this.io.emit('list-users', await getUsers());

      socket.join(uid);

      socket.on('send-message', async (payload) => {
        const msg = await saveMessage(payload);
        this.io.to(payload.to).emit('personal-message', msg);
        this.io.to(payload.from).emit('personal-message', msg);
      });

      socket.on('disconnect', async () => {
        // eslint-disable-next-line no-console
        console.log('disconected');
        await userDisconnected(uid);
        this.io.emit('list-users', await getUsers());
      });
    });
  }
}

module.exports = Sockets;

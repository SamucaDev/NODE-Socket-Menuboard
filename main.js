const {
  httpServer,
  serverSocket,
} = require('./init-server');

const playerModule = require('./player-module');
const meModule = require('./me-module');

serverSocket.on('connection', (client) => {
  console.log(`A new client has connected: ${client.id}`);

  client.emit('connected', {
    id: client.id,
  });


  client.on('authenticate', ({ meId, keyIntegration }) => {
    if (meModule.tryToCreateMe(keyIntegration, client) === true) {
      meModule.emitAuthSuccess();
      return;
    }

    if (playerModule.tryToCreatePlayer(keyIntegration, meId, client) === true) {
      playerModule.emitAuthSuccess(meId);
      return;
    }

    client.emit('authentication-error', { message: 'Client unknown' });
    client.disconnect();
  });

  client.on('send-player-download-request', ({ playerMeId, imageId }) => {
    if (meModule.isMeApplication(client.id)) {
      playerModule.emitDownloadImage(playerMeId, imageId);
    }
  });

  client.on('disconnect', () => {
    if (meModule.isMeApplication(client.id)) {
      meModule.clearClient();
      return;
    }
    
    playerModule.removePlayerBySocketId(client.id);
  });
});


httpServer.listen(5001, () => {
  console.log('Application initialized at port 5001');
});
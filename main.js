const {
  httpServer,
  serverSocket,
} = require('./init-server');

const renderModule = require('./renderModule-module');
const menuboardModule = require('./menuboardModule-module');

serverSocket.on('connection', (client) => {
  console.log(`A new client has connected: ${client.id}`);

  client.emit('connected', {
    id: client.id,
  });

  client.on('authenticate', ({
    keyIntegration,
    keyRender,
    representativeid
  }) => {

    if (renderModule.tryToAuthenticate({
        keyIntegration: keyIntegration,
        keyRender: keyRender,
        client: client,
        clientid: client.id

      }) == true) {

      renderModule.emitAuthSuccess(client.id);
      return;
    }

    if (menuboardModule.tryToAuthenticate({
        keyIntegration: keyIntegration,
        client: client,
        clientid: client.id,
        representativeid: representativeid
      }) == true) {

      menuboardModule.emitAuthSuccess(client.id);
      return;
    }

    client.emit('authentication-error', {
      message: 'Client desconhecido'
    });
    client.disconnect();
  });

  client.on('alter-status-project', ({
    projectaftermakeid,
    midiaid,
    representativeid,
    status
  }) => {
    menuboardModule.alterStatusProject({
      projectaftermakeid: projectaftermakeid,
      midiaid: midiaid,
      representativeid: representativeid,
      status:status
    })
  });



});


httpServer.listen(5001, () => {
  console.log('Application initialized at port 5001');
});
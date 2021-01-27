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
    projectid,
    midiaid,
    representativeid,
    status,
    typeRequest
  }) => {
    menuboardModule.alterStatusProject({
      projectid: projectid,
      midiaid: midiaid,
      representativeid: representativeid,
      status: status,
      typeRequest: typeRequest

    })
  });


  client.on('disconnect', () => {
    // chamar o módulo para remover o client da lista a partir do id dele

    menuboardModule.removeItemsArray(client.id)
    renderModule.removeItemsArray(client.id)
  });


});


httpServer.listen(process.env.PORT, () => {
  console.log('Application initialized at port ' + process.env.PORT);
});
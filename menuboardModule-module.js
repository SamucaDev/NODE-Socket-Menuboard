module.exports = {
  keyIntegration: 'imAMenuboardKey',
  clients: [],
  tryToAuthenticate: function ({
    keyIntegration,
    client,
    clientid,
    representativeid,
  }) {

    if (keyIntegration !== this.keyIntegration) {
      return false;
    }

    this.clients.push({
      socket: client,
      clientid: clientid,
      representativeid: representativeid,
    });

    console.log(this.clients);
    return true;
  },

  emitAuthSuccess: function (clientId) {

    const client = this.clients.find((client) => client.socket.id == clientId);

    if (!client) {
      console.log('Client não encontrado');
      return false;
    }

    client.socket.emit('authentication-success', {
      message: 'Welcome, Menuboard Application'
    });
  },


  alterStatusProject: function ({
    projectaftermakeid,
    midiaid,
    representativeid,
    status
  }) {
    const clients = this.clients.find(client => client.representativeid == representativeid);

    console.log(clients);


    clients.socket.emit('alter-status', {
      midiaid: midiaid,
      projectaftermakeid: projectaftermakeid,
      status: status,
    });

  }


};
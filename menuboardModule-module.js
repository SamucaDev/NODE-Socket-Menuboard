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

  removeItemsArray: function (clientid) {

    this.clients = this.clients.filter(client => client.clientid != clientid);

  },


  alterStatusProject: function ({
    projectid,
    midiaid,
    representativeid,
    status,
    typeRequest,
    frame
  }) {
    const clients = this.clients.find(client => client.representativeid == representativeid);

    console.log(clients);


    clients.socket.emit('alter-status', {
      midiaid: midiaid,
      projectid: projectid,
      status: status,
      typeRequest: typeRequest, //  1 - after 0 - video  
      frame: frame 
    });

    console.log(midiaid);
    console.log(projectid);
    console.log(status);
    console.log(typeRequest);
    console.log(frame);

  }




};
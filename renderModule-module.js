module.exports = {
  keyIntegration: 'imAPlayerKey',
  players: [],

  tryToAuthenticate: function ({
    keyIntegration,
    keyRender,
    client,
    clientid
  }) {
    if (keyIntegration !== this.keyIntegration) {
      return false;
    }

    this.players.push({
      socket: client,
      keyRender: keyRender,
      clientid: clientid
    });

    console.log(this.players);

    return true;
  },


  removeItemsArray: function (clientid) {

    this.players = this.players.filter(client => client.clientid != clientid);

  },

  emitAuthSuccess: function (id) {
    const client = this.players.find((client) => client.socket.id == id);

    if (!client) {
      console.log('Cliente não encontrado');
      return false;
    }

    client.socket.emit('authentication-success', {
      message: 'Welcome, Client Application'
    });
  },








};
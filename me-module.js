module.exports = {
  keyIntegration: 'imAMeKey',
  me: {
    id: null,
    socket: null,
  },
  isMeApplication: function (clientId) {
    return this.me !== null && this.me.id === clientId;
  },
  tryToCreateMe: function (keyIntegration, clientSocket) {
    if (keyIntegration !== this.keyIntegration) {
      return false;
    }

    this.me.id = clientSocket.id;
    this.me.socket = clientSocket;

    return true;
  },
  emitAuthSuccess: function () {
    this.me.socket.emit('authentication-success', { message: 'Welcome, Me Application' });
  },
  clearClient: function () {
    this.me.id = null;
    this.me.socket = null;
  }
};
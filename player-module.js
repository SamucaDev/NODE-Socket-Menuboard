module.exports = {
  keyIntegration: 'imAPlayerKey',
  players: [],
  getPlayerByMeId: function (meId) {
    const player = this.players.find((player) => player.meId === meId);

    if (player === null || typeof player === 'undefined') {
      console.log(`There's no player connected with that id`);
      return null;
    }

    return player;
  },
  removePlayerBySocketId: function (clientId) {
    this.players = this.players.filter((player) => player.id !== clientId);
  },
  tryToCreatePlayer: function (keyIntegration, meId, clientSocket) {
    if (keyIntegration !== this.keyIntegration) {
      return false;
    }

    this.players.push({
      id: clientSocket.id,
      meId,
      socket: clientSocket,
    });

    return true;
  },
  emitAuthSuccess: function (meId) {
    try {
      const player = this.getPlayerByMeId(meId);
      player.socket.emit('authentication-success', { message: 'Welcome, Player' });
    } catch (e) {
      // todo treatment to this
    }
  },
  emitDownloadImage: function (meId, imageId) {
    try {
      const player = this.getPlayerByMeId(meId);
      player.socket.emit('download-image', { imageId });
    } catch (e) {
      // todo treatment to this
    }
  }
};
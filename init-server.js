require('dotenv/config');

const cors = require('cors');
const socketIo = require('socket.io');
const express = require('express');
const { resolveHttpServerCreation, resolveCertificatePath } = require('./server-connection');

const app = express();
app.use(cors());

const server = resolveHttpServerCreation(
  app, resolveCertificatePath()
);

module.exports = {
  httpServer: server,
  serverSocket: socketIo(server),
};

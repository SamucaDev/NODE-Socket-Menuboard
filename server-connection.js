const fs = require('fs');

function resolveHttpServerCreation(expressApp, { certKey, certCer }) {
  let httpConn;
  let server;

  if (process.env.ENVIRONMENT === 'development') {
    httpConn = require('http');
    server = httpConn.createServer(expressApp);
  } else {
    httpConn = require('https');
    server = httpConn.createServer({
      key: certKey,
      cert: certCer,
    }, expressApp);
  }

  return server;
}

function resolveCertificatePath() {
  if (process.env.ENVIRONMENT === 'development') {
    return {
      certCer: null,
      certKey: null,
    };
  }

  return {
    certCer: fs.readFileSync('/certificados/socket.menuboard.com.br/fullchain.cer'),
    certKey: fs.readFileSync('/certificados/socket.menuboard.com.br/socket.menuboard.com.br.key'),
  }
}

module.exports = {
  resolveHttpServerCreation,
  resolveCertificatePath,
};
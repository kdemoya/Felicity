import telegramBot from './services/telegram/index';
import sonarrHandler from './services/sonarr/index';
import * as http from 'http';

const PORT = 1337;

/**
 * Handle requests to Felicity server.
 *
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
const handleRequest = (req, res) => {
  const reqBody = req.body || {};
  const fromSonarr = req.body.EventType === 'Download';

  if (fromSonarr) {
    sonarrHandler(reqBody);
  } else {
    console.log('Felicity received and unhandled request type.');
  }
};

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Felicity is watching over port ${PORT}`);
});

telegramBot();

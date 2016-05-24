import express from 'express';
import bodyParser from 'body-parser';
import telegramBot from './services/telegram/index';
import sonarrHandler from './services/sonarr/index';
import * as http from 'http';

const PORT = 1337;
const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

/**
 * Handle requests to Felicity server.
 *
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
server.post('/', (req, res) => {
  const reqBody = req.body || {};
  const fromSonarr = req.body.EventType === 'Download';

  if (fromSonarr) {
    sonarrHandler(reqBody);
    res.sendStatus(200);
  } else {
    console.log('Felicity received and unhandled request type.');
  }
});

server.listen(PORT, () => {
  console.log(`Felicity is watching over port ${PORT}`);
});

telegramBot();
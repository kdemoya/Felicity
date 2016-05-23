var request = require('request');

export function ifttt (event, key) {
  request.post(`https://maker.ifttt.com/trigger/${event}/with/key/${key}`);
}

export const sonarr = {
  downloaded: (telegram, message) => {
    request.post(`https://api.telegram.org/${telegram.botId}/sendMessage?chat_id=${telegram.chatId}&text=${message}`);
  }
};
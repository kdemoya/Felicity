var request = require('request');

export function ifttt (event, key) {
  request.post('https://maker.ifttt.com/trigger/' + event + '/with/key/' + key);
}
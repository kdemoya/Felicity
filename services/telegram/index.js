import TeleBot from 'telebot';
import * as _ from 'lodash';
import {telegram, ifttt} from '../../configs';
import {ifttt as iftttTrigger} from '../../utils/triggers';

export default () => {
  const bot = new TeleBot(telegram.botConfig);
  const heaterOn = 'heater_on';
  const heaterOff = 'heater_off';

  /**
   * Gets command and trigger signal to switch heater on/off.
   *
   * @param {String} command - User command.
   * @param {Object} msg - Telegram message object.
   */
  let handleSwitch = (command, msg) => {
    const id = msg.chat.id;
    const firstName = msg.from.first_name;
    const authorized = _.includes(telegram.users, msg.from.username);
    const event = _.camelCase(command);
    const message = authorized ? `Got it, ${firstName}! Turning ${event}`
                               : 'Hold on Canary, this is above your pay rate.';

    if (authorized) {
      iftttTrigger(ifttt.events[event], ifttt.key);
    }

    bot.sendMessage(id, message);
  };

  bot.on('/' + heaterOn, (msg) => {
    handleSwitch(heaterOn, msg);
  });

  bot.on('/' + heaterOff, (msg) => {
    handleSwitch(heaterOff, msg);
  });

  bot.on('error', (error) => {
    console.log(error);
    bot.disconnect();
    bot.connect();
  });

  bot.connect();
};

import Bot from 'node-telegram-bot';
import * as _ from 'lodash';
import {telegram, ifttt} from '../../configs';
import {ifttt as iftttTrigger} from '../../utils/triggers';

export default () => {
  const bot = new Bot({
    token: telegram.token
  });

  /**
   * Gets command and trigger signal to switch heater on/off.
   *
   * @param {String} command - User command.
   * @param {Object} msg - Telegram message object.
   */
  const handleSwitch = (command, msg) => {
    const id = msg.chat.id;
    const firstName = msg.from.first_name;
    const authorized = _.includes(telegram.users, msg.from.username);
    const message = authorized ? `Got it, ${firstName}! Hacking into the heater.`
                               : 'Hold on Canary, this is above your pay rate.';

    if (authorized) {
      iftttTrigger(ifttt.events[command], ifttt.key);
    }

    bot.sendMessage({
      chat_id: id,
      text: message
    });
  };

  /**
   * Handle other messages, for miscellaneous behavior.
   *
   * @param {Object} msg - Message object.
   */
  const handleOtherMessages = (msg) => {
    const goodGirl = /Good.*girl/g;

    if (goodGirl.test(msg.text)) {
      const id = msg.chat.id;

      bot.sendMessage({
        chat_id: id,
        text: 'Good girl! 🙆'
      });
    }
  };

  // Start capturing commands.
  bot.on('message', (msg) => {
    const commandText = _
        .chain(msg.text)
        .split('@', 1)
        .snakeCase()
        .value();

    const validCommand = _.includes(telegram.commands, commandText);

    if (validCommand) {
      handleSwitch(commandText, msg);
    } else {
      handleOtherMessages(msg);
    }
  });

  bot.enableAnalytics(telegram.botan);
  bot.start();

  console.log('Felicity is alive!');
};

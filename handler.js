import fetch from 'node-fetch';

const BOT_TOKEN = process.env.BOT_TOKEN;

export const hello = async event => {
  const messageInfo = JSON.parse(event.body);
  const {
    message: {
      chat: { id: chat_id },
      entities: [{
        type = ''
      }] = [{}],
      from: { first_name: userName },
      text
    }
  } = messageInfo;
  const [command] = text.match(/^\/\w+/) || [];

  if (type === 'bot_command') {
    switch (command) {
      case '/greetings':
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id,
            text: `Hello ${userName}👋`
          })
        });
        break;
      default:
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id,
            text: 'Command Not Found ✖'
          })
        });
        break;
    }
  }
};

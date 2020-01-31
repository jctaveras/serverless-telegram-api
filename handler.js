import sendMessage from './lib/sendMessage';
import logResponse from './lib/logger';

const BOT_TOKEN = process.env.BOT_TOKEN;
const botSendMessage = sendMessage(BOT_TOKEN);

export const commands = async (event) => {
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
  let response;

  if (type === 'bot_command') {
    switch (command) {
      case '/greetings':
        response = await botSendMessage(chat_id, `Hello ${userName}👋`);
        logResponse(response);
        break;
      default:
        response = await sendMessage(chat_id, 'Command Not Found ✖');
        logResponse(response);
        break;
    }
  }
};

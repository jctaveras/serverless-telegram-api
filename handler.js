import getUsers from './lib/getUsers';
import logResponse from './lib/logger';
import sendMessage from './lib/sendMessage';
import AWS from 'aws-sdk';

const BOT_TOKEN = process.env.BOT_TOKEN;
const botSendMessage = sendMessage(BOT_TOKEN);
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const commands = async (event) => {
  const { message } = JSON.parse(event.body);
  const {
    chat: { id: chat_id },
    entities: [{
      type = ''
    }] = [{}],
    from: { first_name: userName }
  } = message;
  const isCommand = type === 'bot_command';
  const isJoinUpdate = Object.keys(message).includes('new_chat_members');

  if (isJoinUpdate) {
    const users = getUsers(message['new_chat_members']);

    // Welcome Each New Member
    users.forEach(async function ({ first_name }) {
      const respones = await botSendMessage(chat_id, `Welcome to the group ${first_name}👋`);
      logResponse(respones);
    });

    // Add Users to the database
    users.forEach(async function (user) {
      try {
        await dynamoDB.put({
          TableName: process.env.TableName,
          Item: { ...user }
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  if (isCommand) {
    const [command] = message.text.match(/^\/\w+/) || [];
    let response;

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

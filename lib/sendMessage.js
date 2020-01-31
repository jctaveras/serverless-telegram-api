import fetch from 'node-fetch';

/**
 * A Constructor function that returns the send function
 * @param {string} token
 * @returns {sendMessage~send}
 */
export default function sendMessage(token) {
  /**
   * @param {number|string} chatId
   * @param {string} message
   * @return {object}
   */
  return async function send(chatId, message) {
    const sentMessage = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    });

    return sentMessage ? {
      chatId,
      message,
      status: 200
    } : {
      chatId,
      message,
      status: 500
    };
  };
}

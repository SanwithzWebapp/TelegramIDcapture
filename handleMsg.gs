const token = "XXXXXXXX";
const formBaseUrl = "https://script.google.com/macros/s/XXXXXXXX/exec";

function doPost(e) {
  const contents = JSON.parse(e.postData.contents);
  const chatId = contents.message.chat.id;
  const text = contents.message.text.trim();

  if (text === "/start") {
    sendFormLink(chatId);
  } else if (text === "/glitch") {
    sendFormLinkGlitch(chatId);
  } else {
    sendTelegramMessage(chatId, "I didn't understand that. Please use /start to get the form link.");
  }
}

function sendFormLink(chatId) {
  const formUrl = `${formBaseUrl}?chatId=${chatId}`;
  const message = "Welcome! Please fill out your details using the following form:";
  const button = { text: "Fill Form", url: formUrl };
  sendTelegramMessageWithButton(chatId, message, button);
}

function sendFormLinkGlitch(chatId) {
  const formUrl = `https://lightning-morning-puffin.glitch.me/?chatId=${chatId}`;
  const message = "Welcome! Please fill out your details using the following form:";
  const button = { text: "Fill Glitch Form", url: formUrl };
  sendTelegramMessageWithButton(chatId, message, button);
}

function sendTelegramMessageWithButton(chatId, text, button) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const payload = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      chat_id: chatId,
      text: text,
      reply_markup: {
        inline_keyboard: [[button]],
      },
    }),
  };
  UrlFetchApp.fetch(url, payload);
}

function sendTelegramMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const payload = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      chat_id: chatId,
      text: text,
    }),
  };
  UrlFetchApp.fetch(url, payload);
}

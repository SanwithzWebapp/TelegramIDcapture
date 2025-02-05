function doGet(e) {
  const template = HtmlService.createTemplateFromFile('index');
  template.chatId = e.parameter.chatId || ""; 
  return template.evaluate()
    .setTitle("Telegram Mini App")
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function saveUserData(chatId, name, email, telephone) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form")
  sheet.appendRow([chatId, name, email, "'"+telephone]);
  return "Data saved successfully!";
}

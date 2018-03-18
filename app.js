const bot = require ('./setup/bot_config.js');
const cognitiveService = require ('./cognitiveServices/luis.js');
// const cognitiveService = require ('./cognitiveServices/qnaMaker.js');


//Bot Dialogs
bot.dialog('/', cognitiveService);


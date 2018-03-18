const builder = require('botbuilder');
const server = require ('./server_config.js');

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

const bot = module.exports = new builder.UniversalBot(connector);
bot.set('storage', new builder.MemoryBotStorage());

server.post('/api/messages', connector.listen());

bot.on('deleteUserData', (message) => {
    console.log(`deleteUserData ${JSON.stringify(message)}`)
})

bot.on('conversationUpdate', (message) => {
    // entrada de um novo usuario na conversa
    console.log("Seja bem vindo a conversa!");
})

bot.on('contactRelationUpdate', (message) => {
    console.log(`contactRelationUpdate ${JSON.stringify(message)}`)
})

bot.on('typing', (message) => {
    console.log(`typing ${JSON.stringify(message)}`)  
})

bot.on('ping', (message) => {
    console.log(`ping ${JSON.stringify(message)}`)
})






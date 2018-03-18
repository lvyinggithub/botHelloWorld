const builder = require('botbuilder');
const request = require('request');

const recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/70ff8ce3-1dc9-4ae4-a35b-64818890ca7a?subscription-key=e91e80180f2a478b9b62d45d0d691e27&verbose=true&timezoneOffset=-180&q=');

const luis = new builder.IntentDialog({
    recognizers: [recognizer]
});

//Luis
// Trata a intenção sobre - atenção com o nome da intent que é case-sensitive
luis.matches('sobre', (session, args, next) => {
    session.send('Olá, eu sou um bot que te ensina a fazer hello world!');
})

// Trata a intenção cumprimento - atenção com o nome da intent que é case-sensitive
luis.matches('cumprimento', (session, args, next) => {
    session.send('Olá, vamos fazer alguns hello worlds?');
})

// Trata a intenção cotacao - atenção com o nome da intent que é case-sensitive
luis.matches('hello world', (session, args, next) => {
    const linguagens = builder.EntityRecognizer.findAllEntities(args.entities, 'linguagem');
    console.log(linguagens);
    const message = linguagens.map(m => m.entity).join(', ');
    session.send(`Eu vou verificar um exemplo de hello world em **${message}**`);
    const endpoint = `https://hello-world-bot.azurewebsites.net/hello/consultarByLinguagem/${message}`;
    console.log("endepoint: ", endpoint);
    request(endpoint, (error, response, body) => {
        if (error || !body)
            return session.send('Ocorreu algum erro, tente novamente mais tarde.')
        const descricao = JSON.parse(body);
        // session.send(descricao.map(m => `${m.linguagem}: ${m.descricao}`).join(', '));
        console.log(descricao);
        session.send(descricao);
    })

});

// Trata a intenção None - atenção com o nome da intent que é case-sensitive
luis.onDefault((session, args) => {
    session.send(`Desculpe, não consegui entender a frase **${session.message.text}**`);
})


module.exports = luis;
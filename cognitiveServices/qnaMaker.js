const cognitiveServices = require('botbuilder-cognitiveservices');
const bot = require ('../setup/bot_config.js');

const recognizer = new cognitiveServices.QnAMakerRecognizer({
    knowledgeBaseId: '28e1820a-15ec-4846-a232-33adbef3c54d',
    subscriptionKey: '18b5811c819445e89fb1cd8a598ca217',
    top: 2 
});

const QnaMakerTools = new cognitiveServices.QnAMakerTools();

QnaMakerDialog = new cognitiveServices.QnAMakerDialog({
    recognizers: [recognizer],
    defaultMessage: 'Desculpe, não compreendi. Por Favor, refaça a pergunta com outras palavras!',
    qnaThreshold: 0.6,
    feedbackLib: QnaMakerTools
});

bot.library(QnaMakerTools.createLibrary());

//QnaMaker
QnaMakerDialog.respondFromQnAMakerResult = (session, qnaMakerResult) => {
    const firstAnswer = qnaMakerResult.answers[0].answer
    const composedAnswer = firstAnswer.split(';')
    if (composedAnswer.length === 1) {
    return session.send(firstAnswer)
    }
    const [title, description, url, image] = composedAnswer
    const card = new builder.HeroCard(session)
        .title(title)
        .text(description)
        .images([builder.CardImage.create(session, image.trim())])
        .buttons([builder.CardAction.openUrl(session, url.trim(), 'Ler Documentacao')])
    const resp = new builder.Message(session).addAttachment(card);
    session.send(resp);
}

module.exports = QnaMakerDialog;

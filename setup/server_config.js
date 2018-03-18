const restify = require('restify');

const port = process.env.port || process.env.PORT || 3978;
const server = module.exports = restify.createServer();
server.listen(port, () => {
    console.log(`${server.name} listening to ${server.url}`)
});


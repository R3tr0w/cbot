const { prefix } = require('../config.json')
const uuid = require('uuid')

module.exports = async (client, session, callback) => {
    client.on('messageCreate', message => {
        const { content } = message
        session = content === 'reset' ? uuid.v4() : session
        const { author } = message
        if (author.bot === false) {
            callback(message, session)
        }
    })
}
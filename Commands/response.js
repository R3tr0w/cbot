const dialogflow = require("@google-cloud/dialogflow")
const env = require('dotenv').config()

const project_id = process.env.PROJECT_ID
const account_path = process.env.G_PATH

module.exports = async (message, sessionId) => {
    console.log("sending message")
    const { content } = message
    const sessionClient = new dialogflow.SessionsClient()
    const sessionPath = sessionClient.projectAgentSessionPath(
        project_id,
        sessionId
    )

    const query = {
        session: sessionPath,
        queryInput: {
            text: {
                text: content,
                languageCode: 'en-Us'
            }
        }
    }

    const responses = await sessionClient.detectIntent(query)
    const result = responses[0].queryResult
    message.channel.send(`${result.fulfillmentText}`)
    return

}
let { PythonShell } = require('python-shell')
const { Client, GatewayIntentBits, Partials, intents } = require('discord.js')

const express = require("express")
const env = require('dotenv').config()
const app = express()
const uuid = require('uuid')


var PORT = process.env.PORT || 3000

const command = require("./Commands/command")
const pong = require("./Commands/pong")
const response = require("./Commands/response")


app.listen(PORT, () => {
    console.log("Bot is now live")
    const session = uuid.v4()
    const client = new Client({
        intents: [
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildBans,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ],
        partials: [Partials.Channel],
    })
    client.on("ready", () => {
        console.log(`Bot is currently running on version v${require('./package.json').version}`)

        command(client, session, message => {
            // pong(message);
            response(message, session)
        })
    });

    client.login(process.env.BOTTOKEN)
})
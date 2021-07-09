const Discord = require('discord.js')
const client = new Discord.Client()
const env = require('dotenv').config()

const command = require("./Commands/command")
const pong = require("./Commands/pong")

console.log("Bot is now live")

const aliases = ['nayvs', 'ed', 'ward']

client.on("ready", () => {
    console.log(`Bot is currently running on version v${require('./package.json').version}`)

    command(client, aliases, message => {
        pong(message)
    })
})

client.login(process.env.BOTTOKEN)
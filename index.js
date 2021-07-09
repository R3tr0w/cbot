const Discord = require('discord.js')
const client = new Discord.Client()
const express = require("express")
const env = require('dotenv').config()
const app = express()

var PORT = process.env.PORT || 3000

const command = require("./Commands/command")
const pong = require("./Commands/pong")



const aliases = ['nayvs', 'ed', 'ward']

app.listen(PORT, () => {
    console.log("Bot is now live")
    client.on("ready", () => {
        console.log(`Bot is currently running on version v${require('./package.json').version}`)

        command(client, aliases, message => {
            pong(message)
        })
    })

    client.login(process.env.BOTTOKEN)
})
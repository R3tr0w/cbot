let { PythonShell } = require('python-shell')
const Discord = require('discord.js')
const client = new Discord.Client()
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
    client.on("ready", () => {
        console.log(`Bot is currently running on version v${require('./package.json').version}`)

        command(client, session, message => {
            // pong(message);
            response(message, session)
            options = {
                mode: 'text',
                pythonOptions: ['-u'],
                args: ' development'
            }
            PythonShell.run('Py/dev.py', options, (err, res) => {
                if (err) throw err;
                console.log(res)
            });

        })
    });

    client.login(process.env.BOTTOKEN)
})
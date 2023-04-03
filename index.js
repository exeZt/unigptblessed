//  exeZt- 2023
const Discord = require("discord.js"),
      config = require("./core/config.json"),
      chat = require("./core/source.js"),
      colors = require('colors');

const {
    Client,GatewayIntentBits, Intents
} = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

const prefix = config.prefix;
client.on("ready",() => {
    console.log('>bot ready for service'.green);
});
client.on("messageCreate", async message => {
    if (message.author.bot) return;
    console.log(`\n___________________________________________________________________________________________________________`);
    console.log(`Id сервера: ${message.guild.id}`.cyan);
    console.log(`${config.allowedServersList}`.gray);
    if (!message.content.startsWith(prefix)) return;
    let allowed_str = false;
    for(let i = 0; i <= config.allowedServersList.length; i++) {
        if (message.guild.id === config.allowedServersList[i]) {
            const commandBody = (message.content.slice(prefix.length).split(" "));
            const local_com_body = message.content.slice(prefix.length).trim();
            const command = commandBody[0];
            const args = commandBody.slice(1);
            try {
                allowed_str = true;
                console.log(`\nПолученный запрос ${message.content.slice(prefix.length).trim()}`);
                message.channel.send(`${await shorter(local_com_body, message)}`);
            } catch (e) {
                message.channel.send(`${e}`);
            }
        }
        else{
            console.log(`Не найден подходящий ID`.yellow);
        }
        if (i === config.allowedServersList.length & allowed_str !== true)
            message.channel.send(`ID not found, service not allowed at server`)
                .then(() => console.error(`ID not found, user not allowed to use it`.red))
                    .then(() => console.log(`___________________________________________________________________________________________________________`));
    }
});
async function shorter(localcom, message) {
    let text = await chat.request_gpt(localcom);

    console.log(`Ответ бота ${text}`);
    let arr;
    if (text.length > 3999){
        arr = text.slice(0, 3999);
        console.log("used array to return message".green);
        console.log(`___________________________________________________________________________________________________________\n`);
        return arr;
    } else {
        console.log("response returned successfully".green);
        console.log(`___________________________________________________________________________________________________________\n`);
        return text;
    }
}
client.login(config.token);
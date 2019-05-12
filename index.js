const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
require("dotenv").config();
const express = require('express');
const app = express();
app.get("/", (request, response) => {
response.sendStatus(200);
});
app.listen(process.env.PORT);

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()
fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  // Log commands
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("There are no commands to load...");
    return;
  }
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    if(props.help.aliases)props.help.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });
  });
})

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("The Discord Server", {
    type: 'WATCHING' 
  });
});

let prefix = "!";
bot.prefix = "!";

bot.on("message", async message => {
  
  let messageArray = message.content.split(" ");
  let args = message.content.slice(bot.prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();  
  if (message.author.bot && cmd !== "say") return;
  if(message.channel.type === "dm") return;
  if(message.channel === message.guild.channels.find(c=>c.name==="suggestions") && !message.content.startsWith(prefix)){
    message.delete(500);
    return message.channel.send("Please make your suggestion using !suggest (suggestion)").then(msg=>msg.delete(5000));
  } else if(message.channel === message.guild.channels.find(c=>c.name==="unban-me") && !message.content.startsWith(prefix)){
    message.delete(500);
    return message.channel.send("Please make your request using !appeal").then(msg=>msg.delete(5000));
  } else if(!message.content.startsWith(prefix)) return;
  let command;
  if (bot.commands.has(cmd)) {
    command = bot.commands.get(cmd);
    command.run(bot, message, args);
  } else if (bot.aliases.has(cmd)) {
    command = bot.commands.get(bot.aliases.get(cmd));
    command.run(bot, message, args);
  }
});

bot.on("guildMemberRemove", async member => {
  let messageTyp = Math.floor(Math.random() * 10) + 1;
  let lChannel = member.guild.channels.find(`name`, "join-leave");
  console.log(messageTyp);
  let gPerson = member.user.username;
  const message = messageType => {
    if(messageType === 1) {
      lChannel.send(`Goodbye **${gPerson}**, we will miss you!`);
    } else if(messageType === 2) {
      lChannel.send(`A wild **${gPerson}** has disappeared.`);
    } else if(messageType === 3) {
      lChannel.send(`Swoooosh. **${gPerson}** just took off.`);
    } else if(messageType === 4) {
      lChannel.send(`**${gPerson}** just left... Or did they?`);
    } else if(messageType === 5) {
      lChannel.send(`**${gPerson}** just left the server - glhf!`);
    } else if(messageType === 6) {
      lChannel.send(`Goodbye **${gPerson}**, we were expecting you to stay ( ͡° ͜ʖ ͡°)`);
    } else if(messageType === 7) {
      lChannel.send(`Roses are red, violets are blue, **${gPerson}** just left this server without you`);
    } else if(messageType === 8) {
      lChannel.send(`Brace yourselves. **${gPerson}** just abandoned the server.`);
    } else if(messageType === 9) {
      lChannel.send(`**${gPerson}** just left. Everyone, mess about while you can!`);
    } else {
      lChannel.send(`**${gPerson}** just slid out of the server.`);
    }
  }
  message(messageTyp);
});

bot.on("guildCreate", guild => {
  bot.channels.get("548632669051813910").send(`Joined 
**${guild.name}** with **${guild.memberCount}** members.`);
});

bot.on('voiceStateUpdate', async (oldMember, newMember) => {
 if (newMember.guild.me.voiceChannel.members.size < 2) newMember.guild.me.voiceChannel.leave();
})

bot.login(process.env.SECRET);

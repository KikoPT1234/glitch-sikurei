const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  let msg = await message.channel.send('Ping is being appreciated... :bar_chart:');
  msg.edit('Pong! The Ping is: ' + Math.round((msg.createdTimestamp - message.createdTimestamp) - bot.ping) + 'ms');
}
module.exports.help = {
  name: "ping", //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Ping"
}

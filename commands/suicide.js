const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  return message.channel.send(`${message.author} has just comitted suicide!`);
}
module.exports.help = {
  name: "suicide",
  description: "suicide."
}

const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  return message.channel.send(`${message.author} has just killed themselves!`);
}
module.exports.help = {
  name: "kms",
  description: "suicide."
}

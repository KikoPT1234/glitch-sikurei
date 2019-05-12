const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  return message.channel.send(`${message.author}: lolno`);
}

module.exports.help = {
  name: "lolno",
  description: "lolno"
}
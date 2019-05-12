const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  return message.channel.send(`${message.author}: lolyes`);
}

module.exports.help = {
  name: "lolyes",
  description: "lolyes"
}
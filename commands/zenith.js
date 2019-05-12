const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  return message.channel.send("Zenith is gay!");
}
module.exports.help = {
  name: "zenith",
  description: "Zenith is gay!"
}

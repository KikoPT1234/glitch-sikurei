const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  return message.channel.send("Kiko is Bob da bus driver");
}
module.exports.help = {
  name: "kiko",
  description: "Description"
}

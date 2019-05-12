const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  return message.channel.send(`${message.author} cries ;-;`);
}
module.exports.help = {
  name: "cri",
  aliases: ["cry", "icri"],
  description: "i cri ;-;"
}

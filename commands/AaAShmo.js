const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  return message.channel.send("AaAShmo is lazy");
}
module.exports.help = {
  name: "AaAShmo",
  aliases: ["ash"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "AaAShmo is lazy"
}

const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  return message.channel.send(`${message.author} has just facepalmed!`);
}
module.exports.help = {
  name: "facepalm",
  aliases: ["fpalm"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Facepalm."
}

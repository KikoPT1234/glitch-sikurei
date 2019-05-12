const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  return message.channel.send(`Fuck ${message.author}'s life!`);
}
module.exports.help = {
  name: "fmylife",
  aliases: ["flife", "fuckmylife", "fucklife", "fml"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "f our lifes"
}

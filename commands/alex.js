const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  return message.channel.send("Alex is a potato wannabe");
}
module.exports.help = {
  name: "alexthepotato",
  aliases: ["alex"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Alex is a potato wannabe"
}

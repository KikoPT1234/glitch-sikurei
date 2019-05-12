const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {

  message.delete(500);
  let dieResult = Math.floor(Math.random() * 6) + 1;

  return message.channel.send(dieResult);
}

module.exports.help = {
  name: "rolldie",
  aliases: ["rdie"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Random number between 1 and 6"
}

const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {

  message.delete(500);
  let flipResult = Math.random();
  if(flipResult < 0.50){
    return message.channel.send("It's Heads!");
  } else {
    return message.channel.send("It's Tales!");
  }
}
module.exports.help = {
  name: "flipcoin",
  aliases: ["fcoin"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Flip a coin"
}

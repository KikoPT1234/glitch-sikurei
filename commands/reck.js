const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {

  message.delete(500);
  let reckU = message.mentions.members.first() || message.guild.members.get(args[0]); //this is good. More efficient //alright
  if(!reckU) return message.channel.send("Couldn't find user.");

  return message.channel.send(`${reckU} has been rekt by ` + message.author + "!");
}
module.exports.help = {
  name: "reck",
  aliases: ["ru"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Reck a user"
}

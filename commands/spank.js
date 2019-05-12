const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  let spankU = message.mentions.members.first() || message.guild.members.get(args[0]); //this is good. More efficient //alright
  if(!spankU) return message.channel.send("Couldn't find user.");

  return message.channel.send(`${spankU} has been spanked by ${message.author}!`);
}
module.exports.help = {
  name: "spank",
  aliases: ["sp"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "spank a player"
}

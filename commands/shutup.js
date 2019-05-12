const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  let stfuU = message.mentions.members.first() || message.guild.members.get(args[0]); //this is good. More efficient //alright
  if(!stfuU) return message.channel.send("Couldn't find user.");

  return message.channel.send(`${message.author} has told ${stfuU} to shut the fuck up!`);
}
module.exports.help = {
  name: "stfu",
  aliases: ["su", "shutup"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "STFU"
}

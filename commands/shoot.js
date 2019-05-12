const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  let shootU = message.mentions.members.first() || message.guild.members.get(args[0]); //this is good. More efficient //alright
  if(!shootU) return message.channel.send("Couldn't find user.");

  return message.channel.send(`${message.author} ▄︻̷̿┻̿═━一 ${shootU}`);
}
module.exports.help = {
  name: "shoot",
  aliases: ["st"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "OH SHOOT"
}

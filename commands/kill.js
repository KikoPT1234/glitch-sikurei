const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  let user = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!user) return message.channel.send("Please specify a user");
  return message.channel.send(`${message.author} killed ${user}`);
}
module.exports.help = {
  name: "kill",
  aliases: ["ku"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Imma kill u"
}

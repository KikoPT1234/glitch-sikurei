const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  let user = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!user) return message.channel.send(`${message.author} agrees`);
  else return message.channel.send(`${message.author} agrees with ${user}`);
}

module.exports.help = {
  name: "agree",
  description: "agreed"
}
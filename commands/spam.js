const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  const member = message.mentions.members.first();
  const amount = parseInt(args[1]);
  if (!amount || isNaN(amount) || amount > 10 || amount < 1) return message.channel.send("Please specify an amount of messages between 1 and 10");
  message.channel.send(`${member}, ${message.author} has requested to spam you`);
  for (let i = 0; i < amount; i++) {
    message.channel.send(`${member}`);
  }
}

module.exports.help = {
  name: "spam"
}
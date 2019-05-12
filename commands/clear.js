const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("nope.");
  if(!args[0]) return message.channel.send("No arguments provided");
  message.delete(500).then(() => {
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
    });
  });
}
module.exports.help = {
  name: "clear",
  aliases: ["cc", "clearchat"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Clear a certain number of messages"
}

const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  let sayCounter = 0;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "!say") sayCounter += 1;
    if (sayCounter > 5) args[i] = "say";
  }
  return message.channel.send(args.join(" "));
}

module.exports.help = {
  name: "say",
  description: "make the bot say something"
}
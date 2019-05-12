const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  let argument = args.join(" ");
  if (argument) return message.channel.send(`${argument} is gone!`, {
    file: "./Pictures/CrabRave.gif"
  });
  else return message.channel.send({
    file: "./Pictures/CrabRave.gif"
  });
}
module.exports.help = {
  name: "crabrave",
  aliases: ["rave", "crab", "cr"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "I AM GONE!"
}

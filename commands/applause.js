const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  return message.channel.send(`${message.author}: *clap clap*`, {
    file: "https://cdn.glitch.com/253aa16b-7436-4e08-939c-8429a8d3d0c3%2Fapplause.gif"
  });
}

module.exports.help = {
  name: "applause",
  aliases: ["applaud", "clap", "claps"],
  description: "lolyes"
}
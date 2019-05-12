const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  return message.channel.send({
    file: "./Pictures/YDS.jpeg"
  })
}
module.exports.help = {
  name: "duh",
  description: "YOU DON'T SAY?"
}

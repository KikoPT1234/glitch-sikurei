const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  let user = message.mentions.members.first() || message.guild.members.get(args[0]);
  const getStatus = status => {
    if (status === "online") return "Pictures/greenuno.jpeg";
    else if (status === "offline") return "Pictures/blueuno.jpeg";
    else if (status === "idle") return "Pictures/yellowuno.jpeg";
    else return "Pictures/reduno.jpeg";
  }
  let userStatus = message.author.presence.status;
  let file = getStatus(userStatus);
  if (user) return message.channel.send(message.author + ": No U, " + user, {
    file: file
  });
  else return message.channel.send(message.author + ": No U", {
    file: file
  });
}
module.exports.help = {
  name: "reversecard",
  aliases: ["uno", "reverse", "card", "unoreversecard", "nou"],
  description: "No U"
}

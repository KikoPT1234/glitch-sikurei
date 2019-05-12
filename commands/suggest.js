const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  if(!(message.channel === message.guild.channels.find(c=>c.name==="suggestions"))) return;
  message.delete(500);
  let suggestion = args.join(" ");
  if(!suggestion) return message.channel.send("Please include your suggestion").then(msg => msg.delete(5000));
  message.delete();
  message.channel.send("Your suggestion has been sent, thanks for the Feedback!").then(msg => msg.delete(5000));
  let sEmbed = new Discord.RichEmbed()
  .setTitle("**Suggestion**")
  .setColor("00a1ff")
  .addField("Sent By", `${message.author} with ID ${message.author.id}`)
  .addField("Time", message.createdAt.toLocaleString())
  .addField("Suggestion", suggestion);

  let sChannel = message.guild.channels.find(c=>c.name==="control-room");
  if(!sChannel) return message.channel.send("Couldn't find control-room channel");
  return sChannel.send(sEmbed);
}
module.exports.help = {
  name: "suggest",
  aliases: ["su", "suggestion"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Make a suggestion"
}

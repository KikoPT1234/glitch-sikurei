const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  if(message.channel !== message.guild.channels.find(c=>c.name==="unban-me")) return;
  let controlChannel = message.guild.channels.find(c=>c.name==="control-room")
  let args1 = args.join(" ");
  if(!args1 || args1.length < 51) return message.channel.send("Please specify a reason on why we should unban you. It must be over 50 characters.").then(msg=>msg.delete(5000));
  let appealEmbed = new Discord.RichEmbed()
  .setTitle("**Unban Request**")
  .setColor("ce0030")
  .addField("User", message.author)
  .addField("Time", message.createdAt.toLocaleString())
  .addField("Appeal", args1);

  if(!controlChannel) return message.channel.send("Couldn't find destination channel (control-room).");
  controlChannel.send(appealEmbed);
  return message.channel.send("Application Sent").then(msg=>msg.delete(5000));
}
module.exports.help = {
  name: "appeal",
  aliases: ["request", "ba"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Ban Appeal"
}

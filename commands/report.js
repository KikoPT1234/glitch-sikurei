const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {

  message.delete(500).catch(O_o=>{});
  let rUser = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!rUser) return message.channel.send("Couldn't find user.");
  let reason = args.slice(1).join(" ") || "No reason provided"
  if(rUser.id === message.author.id){
    return message.channel.send("You cannot report yourself");
  }

  let reportEmbed = new Discord.RichEmbed()
  .setTitle("**Report**")
  .setColor("a00005")
  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  .addField("Reported By", `${message.author} with ID ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt.toLocaleString())
  .addField("Reason", reason)
  let reportschannel = message.guild.channels.find(c=>c.name==="control-room");
  if(!reportschannel) return message.channel.send("Couldn't find control-room channel.")

  reportschannel.send(reportEmbed)
}
module.exports.help = {
  name: "report",
  aliases: ["r"], //CANNOT BE THE SAME FOR 2 COMMANDS <- IMPORTANT
  description: "Command to report members"
}

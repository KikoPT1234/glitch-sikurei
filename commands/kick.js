const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  let kUser = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!kUser) return message.channel.send("Can't find user!");
  let kReason = args.slice(1).join(" ")||"No reason provided";
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Lolno... You don't have the sweet kick permissions!");
  if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("REKT! The user can't be kicked! How sad!");
  let kickEmbed = new Discord.RichEmbed()
  .setTitle("**Kick**")
  .setColor("ff00e1")
  .addField("Kicked User", `${kUser.username} with ID ${kUser.id}`)
  .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Kicked In", message.channel)
  .addField("Time", message.createdAt.toLocaleString())
  .addField("Reason", kReason);

  let kickChannel = message.guild.channels.find(c=>c.name==="control-room");
  if(!kickChannel) return message.channel.send("Can't find control-room channel.");

  try{
    await kUser.kick(kReason);
    kickChannel.send(kickEmbed);
  }catch(e){
    message.channel.send(`:x: **| Member ${kUser.user} couldn't be kicked. Reason: ${e.message}**`).then(m=>m.delete(5000).catch(e=>{}))
  }
  return;
}
module.exports.help = {
  name: "kick",
  aliases: ["ku"],
  description: "Kick a member"
}

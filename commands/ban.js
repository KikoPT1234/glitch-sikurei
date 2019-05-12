const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  let bUser = message.mentions.members.first() || await bot.fetchUser(args[0]);
  if(!bUser) return message.channel.send("Can't find user!");
  let bReason = args.slice(1).join(" ")||"No reason provided";
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Lolno... You don't have the sweet ban permissions!");
  if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("REKT! The user can't be banned! How sad!");
  let banEmbed = new Discord.RichEmbed()
  .setTitle("**Ban**")
  .setColor("424242")
  .addField("Banned User", `${bUser.username} with ID ${bUser.id}`)
  .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("Banned In", message.channel)
  .addField("Time", message.createdAt.toLocaleString())
  .addField("Reason", bReason);

  let banChannel = message.guild.channels.find(c=>c.name==="control-room");
  if(!banChannel) return message.channel.send("Can't find control-room channel.");

  try{
    await bUser.ban(bReason);
    banChannel.send(banEmbed);
  }catch(e){
    message.channel.send(`:x: **| Member ${bUser.user} couldn't be banned. Reason: ${e.message}**`).then(m=>m.delete(5000).catch(e=>{}))
  }
  return;
}
module.exports.help = {
  name: "ban",
  aliases: ["bu" ], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Ban a user"
}

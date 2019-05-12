const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  let uUser = await bot.fetchUser(args[0]);
  if(!uUser) return message.channel.send("Can't find user!");
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Lolno... You don't have the sweet unban permissions!");
  let unbanEmbed = new Discord.RichEmbed()
  .setTitle("**Unban**")
  .setColor("c4c4c4")
  .addField("Unbanned User", `**${uUser.username}** with ID ${uUser.id}`)
  .addField("Unbanned By", `${message.author} with ID ${message.author.id}`)
  .addField("Time", message.createdAt.toLocaleString())

  let unbanChannel = message.guild.channels.find(c=>c.name==="control-room");
  if(!unbanChannel) return message.channel.send("Can't find control-room channel.");

  try{
    await message.guild.unban(uUser);
    unbanChannel.send(unbanEmbed);
  }catch(e){
    message.channel.send(`:x: **| Member ${uUser.user} couldn't be unbanned. Reason: ${e.message}**`).then(m=>m.delete(5000).catch(e=>{}))
  }
  return;
}
module.exports.help = {
  name: "unban",
  aliases: ["ubu"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Unban a user"
}

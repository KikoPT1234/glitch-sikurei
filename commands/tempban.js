const Discord = require("discord.js");
const ms = require("ms");
const rTime = require("../rTime.js");

module.exports.run = async (bot, message, args) => {
  let bUser = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!bUser) return message.channel.send("Could not find user");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("LOLNO! You don't have the precious mute permissions! How sad!");
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("REKT! The user can't be banned! How sad!");
  let bReason = args.slice(2).join(" ") || "No reason provided";
  let banEmbed = new Discord.RichEmbed()
  .setTitle("**Tempban**")
  .setColor("424242")
  .addField("Tempbanned User", `${bUser} with ID ${bUser.id}`)
  .addField("Tempbanned By", `${message.author} with ID ${message.author.id}`)
  .addField("Tempbanned In", message.channel)
  .addField("Time", message.createdAt.toLocaleString())
  .addField("Reason", bReason);

  let bantime = args[1] || "30m";

    bUser.ban(bReason).then(() => {
      message.delete(500);
      bUser.send(`Hello, you have been tempbanned in ${message.guild.name} for ${rTime.rTime(bantime)} for: ${bReason}`);
      message.channel.send(`${bUser} has been tempbanned for ${rTime.rTime(bantime)}`);

      banEmbed.addField("Duration of Ban", rTime.rTime(bantime));

      let banChannel = message.guild.channels.find(c=>c.name==="control-room");
      if(!banChannel) return message.channel.send("Can't find control-room channel.");

      banChannel.send(banEmbed);

      setTimeout(() => {
        message.guild.unban(bUser);
        message.channel.send(`${bUser} has been unbanned`);
      }, rTime.calculateMilliseconds(bantime));
    });
}

module.exports.help = {
  name: "tempban",
  aliases: ["tb"],
  description: "Tempban a user"
}

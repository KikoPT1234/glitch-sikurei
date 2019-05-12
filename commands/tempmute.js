const Discord = require("discord.js");
const ms = require("ms");
const rTime = require("../rTime.js")

module.exports.run = async (bot, message, args) => {
  let mUser = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!mUser) return message.channel.send("Could not find user");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("LOLNO! You don't have the precious mute permissions! How sad!");
  if(mUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("REKT! The user can't be muted! How sad!");
  let mReason = args.slice(2).join(" ") || "No reason provided";
  let muteEmbed = new Discord.RichEmbed()
  .setTitle("**Tempmute**")
  .setColor("514f48")
  .addField("Tempmuted User", `${mUser} with ID ${mUser.id}`)
  .addField("Tempmuted By", `${message.author} with ID ${message.author.id}`)
  .addField("Tempmuted In", message.channel)
  .addField("Time", message.createdAt.toLocaleString())
  .addField("Reason", mReason);

  let muterole = message.guild.roles.find(r => r.name === "Muted");
  if(!muterole) {
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#514f48",
        permissions: [],
        position: message.guild.me.highestRole.position - 1
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SEND_TTS_MESSAGES: false,
          ATTACH_FILES: false,
          SPEAK: false
        })
      })
    } catch(e) {
      console.log(e.stack);
    }
  }

  let mutetime = args[1] || "30m";

  if(!mUser.roles.has(muterole.id)){
    mUser.addRole(muterole.id).then(() => {
      message.delete();
      mUser.send(`Hello, you have been muted in ${message.guild.name} for ${rTime.rTime(mutetime)} for: ${mReason}`);
      message.channel.send(`${mUser} has been muted for ${rTime.rTime(mutetime)}`);

      muteEmbed.addField("Duration of Mute", rTime.rTime(mutetime));

      let muteChannel = message.guild.channels.find(c=>c.name==="control-room");
      if(!muteChannel) return message.channel.send("Can't find control-room channel.");

      muteChannel.send(muteEmbed);

      setTimeout(() => {
        mUser.removeRole(muterole.id);
        message.channel.send(`${mUser} has been unmuted`);
      }, rTime.calculateMilliseconds(mutetime));
    });
  } else {
    message.channel.send(`${mUser} is already muted! Use !unmute to remove it!`);
  }
}

module.exports.help = {
  name: "tempmute",
  aliases: ["tm"],
  description: "Mute a person for a determined amount of time"
}

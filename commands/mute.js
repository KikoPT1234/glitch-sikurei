const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  let mUser = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!mUser) return message.channel.send("Could not find user");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("LOLNO! You don't have the precious mute permissions! How sad!");
  if(mUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("REKT! The user can't be muted! How sad!");
  let mReason = args.slice(1).join(" ") || "No reason provided";
  let muteEmbed = new Discord.RichEmbed()
  .setTitle("**Mute**")
  .setColor("514f48")
  .addField("Muted User", `${mUser} with ID ${mUser.id}`)
  .addField("Muted By", `${message.author} with ID ${message.author.id}`)
  .addField("Muted In", message.channel)
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
  if(!mUser.roles.has(muterole.id)){
    mUser.addRole(muterole.id).then(() => {
      message.delete();
      mUser.send(`Hello, you have been muted in ${message.guild.name} for: ${mReason}`);
      message.channel.send(`${mUser} has been muted`);

      let muteChannel = message.guild.channels.find(c=>c.name==="control-room");
      if(!muteChannel) return message.channel.send("Can't find control-room channel.");

      muteChannel.send(muteEmbed);
    });
  } else {
    message.channel.send(`${mUser} is already muted! Use !unmute to remove it!`);
  }


}
module.exports.help = {
  name: "mute",
  aliases: ["mu"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Mute a user"
}

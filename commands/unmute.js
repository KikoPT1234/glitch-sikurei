const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  let umUser = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!umUser) return message.channel.send("Could not find user");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("LOLNO! You don't have the precious mute permissions! How sad!");
  if(umUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("REKT! The user can't be kicked! How sad!");
  let unmuteEmbed = new Discord.RichEmbed()
  .setTitle("**Unmute**")
  .setColor("514f48")
  .addField("Unmuted User", `${umUser} with ID ${umUser.id}`)
  .addField("Unmuted By", `${message.author} with ID ${message.author.id}`)
  .addField("Unmuted In", message.channel)
  .addField("Time", message.createdAt.toLocaleString())

  let muterole = message.guild.roles.find(r => r.name === "Muted");
  if(!muterole) return message.channel.send("The Muted role does not exist!");

  if(umUser.roles.has(muterole.id)){
    umUser.removeRole(muterole.id).then(() => {
      message.delete();
      message.channel.send(`${umUser} has been unmuted`);

      let unmuteChannel = message.guild.channels.find(c=>c.name==="control-room");
      if(!unmuteChannel) return message.channel.send("Can't find control-room channel.");
      unmuteChannel.send(unmuteEmbed);
    });
  } else {
    message.channel.send(`${umUser} is already unmuted! Use !mute to mute the user!`);
  }


}
module.exports.help = {
  name: "unmute",
  aliases: ["umu"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Unmute a user"
}

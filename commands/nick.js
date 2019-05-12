const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  let botrole = message.guild.me.highestRole;
  let nick;
  let user = message.mentions.members.first();
  if(!user){
    nick = args.join(" ");
    if(!message.member.hasPermission("CHANGE_NICKNAME")) return message.channel.send("You don't have permission to change your nickname!").then(msg=>msg.delete(5000));
  } else {
    nick = args.slice(1).join(" ");
    if(!message.member.hasPermission("MANAGE_NICKNAMES") && user.id !== message.author.id) return message.channel.send("LOLNO! You don't have the permissions to change this user's nickname!").then(msg=>msg.delete(5000));
    if(user.id === message.guild.me.id){
      message.guild.me.setNickname(nick);
      return message.channel.send(`Changed my nickname to **${nick}**`).then(msg=>msg.delete(5000));
    }
  }
  if(!user || user.id === message.author.id){
  if(message.author.id === message.guild.ownerID) return message.channel.send("Sorry, but I can't change the Owner's nickname").then(msg=>msg.delete(5000));
  if (!(message.member.highestRole.position >= botrole.position)){
    if(nick === "" || nick === "off"){
      message.member.setNickname("");
      return message.channel.send("Nickname off").then(msg=>msg.delete(5000));
    } else {
      message.member.setNickname(nick);
      return message.channel.send(`Nickname changed to: **${nick}**`).then(msg=>msg.delete(5000));
    }
  } else {
    return message.channel.send(`Sorry, but I don't have permissions to change a ${message.member.highestRole.name}'s nickname`).then(msg => msg.delete(5000));
  }
} else {
  if(user.id === message.guild.ownerID) return message.channel.send("Sorry, but I can't change the Owner's nickname").then(msg=>msg.delete(5000));
  if(user.highestRole.position < botrole.position){
    if(nick === "" || nick === "off"){
      user.setNickname("");
      return message.channel.send(`Nickname off for ${user}`).then(msg=>msg.delete(5000));
    } else {
      user.setNickname(nick);
      return message.channel.send(`${user}'s nickname changed to: **${nick}**`).then(msg=>msg.delete(5000));
    }
  } else return message.channel.send(`Sorry, but I don't have permissions to change ${user}'s nicknamme, because his role, ${user.highestRole} is on a higher position than mine.`).then(msg=>msg.delete(5000));
}
}
module.exports.help = {
  name: "nick",
  aliases: ["nickname", "nn"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Set a user's nickname"
}

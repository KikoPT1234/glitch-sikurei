const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  const user = message.mentions.users.first() || await bot.fetchUser(args[0] || message.author).catch(() => null); // this will take the mentioned user, or take it from cache, or fetch it
  if (user === null) return message.channel.send("Please specify a valid user ID / mention, or leave the space blank to target yourself");
  const member = await message.guild.fetchMember(user).catch(() => null); // take the member from cache, or fetch it, otherwise `null`
  let isBot;
  if(user.bot) isBot = "Yes";
  else isBot = "No";
  let status;
  if (user.presence.status === "online") status = "Online";
  else if (user.presence.status === "idle") status = "Idle";
  else if (user.presence.status === "offline") status = "Offline";
  else status = "Do Not Disturb";
  let userEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL)
  .setTitle(`**${user.username}'s Information**`)
  .setColor("FF048B")
  .setThumbnail(user.displayAvatarURL)
  .addField("Tag", user.tag)
  .addField("ID", user.id)
  .addField("Current Status", status)
  .addField("Joined Discord", user.createdAt.toLocaleString());
  
  if (member) {
    userEmbed.addField("Joined the Server", member.joinedAt.toLocaleString());
    if (member.roles.size > 1) userEmbed.addField("Roles", member.roles.filter(r => r.name !== "@everyone").map(r => r.name).join(", "));
    if (member.nickname) userEmbed.addField("Nickname", member.nickname);
  }

  userEmbed.addField("User is a bot", isBot);

  return message.channel.send(userEmbed);
}

module.exports.help = {
  name: "user",
  aliases: ["member", "getuser", "getmember"],
  description: "Get information from any user on Discord"
}

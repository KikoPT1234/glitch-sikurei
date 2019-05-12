const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL
    let serverembed = new Discord.RichEmbed()
    .setTitle("**Server Information**")
    .setColor("ffcc00")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt.toLocaleString())
    .addField("You Joined", message.member.joinedAt.toLocaleString())
    .addField("Number of Roles", message.guild.roles.size)
    .addField("Total Members", message.guild.memberCount);
  
    if (message.member.roles.size > 1) serverembed.addField("Your Highest Role", message.member.highestRole.name);

    return message.channel.send(serverembed);
}
module.exports.help = {
  name: "serverinfo",
  aliases: ["sinfo"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Server information"
}

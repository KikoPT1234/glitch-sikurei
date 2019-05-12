const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {

  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setTitle("**Bot Information**")
  .setColor("FF048B")
  .setThumbnail(bicon)
  .addField("Bot Name", bot.user.username)
  .addField("Created On", bot.user.createdAt.toLocaleString())
  .addField("Created By", "Kiko#3665")
  .addField("Number of Commands", bot.commands.size)
  .addField("Number of Guilds", bot.guilds.size);

  if (message.guild.me.highestRole.size > 1) botembed.addField("Highest Role", message.guild.me.highestRole.name)

  return message.channel.send(botembed);
}

module.exports.help = {
  name: "botinfo",
  aliases: ["binfo"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Siki's info"
}

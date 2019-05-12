const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  let User = message.mentions.members.first() || message.guild.members.get(args[0]);
  let role = message.guild.roles.find(r => r.name === args.slice(1).join(" "));
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("I don't see the permissions...");
  if(!User) return message.channel.send("User not found");
  if(!role) return message.channel.send("The role doesn't exist!");
  let botrole = message.guild.me.highestRole;
  if(role.position < botrole.position){
    let arEmbed = new Discord.RichEmbed()
    .setTitle("**Role Add**")
    .setColor("3aff28")
    .addField("Added User", `${User} with ID ${User.id}`)
    .addField("Added By", `${message.author} with ID ${message.author.id}`)
    .addField("Role Added", `${role} with ID ${role.id}`)
    .addField("Time", message.createdAt.toLocaleString());

  if(!User.roles.has(role.id)) {
    User.addRole(role.id).then(() => {
      message.delete();
      User.send(`You have been added to the role ${role} in ${message.guild.name}`).catch(e => message.channel.send(`Could not notify user for the following reason: ${e}`).then(msg => msg.delete(5000)));

      let Channel = message.guild.channels.find(c=>c.name==="control-room");
      if(!Channel) return message.channel.send("Can't find control-room channel.");

      Channel.send(arEmbed);
    })
  } else {
    return message.channel.send("The user already has that role!");
  }
} else return message.channel.send("I don't have permission to add this role!")
}
module.exports.help = {
  name: "addrole",
  aliases: ["ar"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Add a role to a member"
}

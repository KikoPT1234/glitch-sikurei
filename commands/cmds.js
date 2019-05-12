const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  let page = args[0];
  let PlayerImg = message.author.displayAvatarURL;
  let list = new Discord.RichEmbed()
  if(!page || page === "1"){
    list
    .setAuthor(message.author.username, PlayerImg)
    .setTitle("**Command List**")
    .setDescription("**Page 1/2**")
    .setColor("ff6100")
    .addField("AaAShmo \n*Alias: ash*", "AaAShmo is lazy")
    .addField("Addrole \n*Alias: ar*", "An Admin only command that adds a role to a user")
    .addField("Agree", "Agreed, dude!")
    .addField("AlexThePotato \n*Alias: alex*", "Alex is a potato wannabe")
    .addField("Appeal \n*Alias: request, ba*", `Make a ban appeal. This command only works in a channel called unban-me.`)
    .addField("Applause \n*Alias: applaud, clap, claps*", "*clap clap*")
    .addField("Ban \n*Alias: bu*", "An Admin only command that bans people from the Discord Server")
    .addField("Botinfo \n*Alias: binfo*", "This command gives you more information about me!")
    .addField("Bow", "All bow to the king!")
    .addField("Clear \n*Aliases: cc, clearchat*", "This command deletes a certain number of messages from the chat")
    .addField("Cmds \n*Aliases: help, listcmd(s), cmd, command(s), cmd(s)list*", "List of commands... You've probably used it to see this though... Why is this in the list? KIKO!")
    .addField("Crabrave \n*Aliases: crab, rave, cr*", "I AM GONE!")
    .addField("Cri \n*Aliases: cry, icri*", "i cri ;-;")
    .addField("Duh", "YOU DON'T SAY?")
    .addField("Facepalm \n*Alias: fpalm*", `${message.author} has just facepalmed!`)
    .addField("Fuckmylife \n*Aliases: flife, fmylife, fucklife, fml*", "Fuck Kiko's life! (jk lol he doesn't even have one)")
    .addField("Flipcoin \n*Alias: fcoin*", "Flips a coin (Heads or Tales)")
    .addField("Kick \n*Alias: ku*", "An Admin only command that kicks people from the Discord Server")
    .addField("Kiko", "Kiko is Bob da bus driver")
    .addField("Kill", "'Kill' someone")
    .addField("Kms", "PLEASE NOTE THAT THIS COMMAND IS A JOKE AND THAT ACTUAL SUICIDE IS SERIOUS")
    .addField("Lolno", "lolno")
    .addField("Lolyes", "lolyes")
    .addField("Mute \n*Alias: mu*", "An Admin only command that mutes people")

    message.author.send(list);
    message.channel.send("Message sent to DM").then(msg => msg.delete(5000));

  } else if(page === "2"){
    list
    .setAuthor(message.author.username, PlayerImg)
    .setDescription("**Page 2/2**")
    .setTitle("**Command List**")
    .setColor("ff6100")
    .addField("Nick \n*Aliases: nickname, nn*", "Change your or another user's nickname")
    .addField("Ping", "Pong!")
    .addField("Praise", "All praise the king!")
    .addField("Reck \n*Alias: ru*", "Recks a user")
    .addField("Removerole \n*Alias: rr*", "An Admin only command that removes a role from a user")
    .addField("Report \n*Alias: r*", "Report a user")
    .addField("Reversecard \n*Alias: card, reverse, uno, nou*", "No u, bish")
    .addField("Rolldie \n*Alias: rdie*", "Random number between 1 and 6")
    .addField("Say", "Make the bot say what you want")
    .addField("Serverinfo \n*Alias: sinfo*", "Info about the server")
    .addField("Shoot \n*Alias: st*", "▄︻̷̿┻̿═━一")
    .addField("Shutup \n*Aliases: shutup, su*", "Hey could you please be quiet? (in a violent way)")
    .addField("Spank \n*Alias: sp*", "Spank a user when you're mad at them")
    .addField("Spear", "--------I>")
    .addField("Suggest \n*Aliases: suggestion, su*", `Make a suggestion about the server. This command only works in a channel named suggestions`)
    .addField("Suicide", "PLEASE NOTE THAT THIS COMMAND IS A JOKE AND THAT ACTUAL SUICIDE IS SERIOUS THING")
    .addField("Sword", "0==l=======>")
    .addField("Tempban \n*Alias: tb*", "An Admin only command that bans a user for a determined amount of time")
    .addField("Tempmute \n*Alias: tm*", "An Admin only command that mutes a user for a determined amount of time")
    .addField("Unban \n*Alias: ubu*", "An Admin only command that unbans a user. USE THE USER'S ID!")
    .addField("Unmute \n*Alias: umu*", "An Admin only command that unmutes a user")
    .addField("User \n*Aliases: member, getuser, getmember", "Get information about any user on Discord. If the user is not on the server, you must use their ID")
    .addField("Zenith", "Zenith is gay!");

    message.author.send(list);
    message.channel.send("Message sent to DM").then(msg => msg.delete(5000));

  } else return message.channel.send("Usage: !cmds [page]. Available pages: 2").then(msg => msg.delete(5000));
}
module.exports.help = {
  name: "cmds",
  aliases: ["listcmds", "cmd", "command", "commands", "listcmd", "cmdlist", "cmdslist", "help"], //CANNOT BE THE SAME FOR 2 COMMANDS
  description: "Command List"
}

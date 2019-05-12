const Discord = require('discord.js');
const ytdl = require('ytdl-core');
module.exports.run = async (bot, message, args) => {
  message.delete(500);
  if (message.guild.me.voiceChannel) message.guild.me.voiceChannel.leave();
  const vChannel = message.member.voiceChannel;
  if (!vChannel) return message.channel.send('Please join a voice channel first');
  const permissions = vChannel.permissionsFor(message.client.user);
  if (!permissions.has('CONNECT')) return message.channel.send('I don\'t have permissions to join your voice channel!');
  if (!permissions.has('SPEAK')) return message.channel.send('I don\'t have permissions to speak on the voice channel!');

  try {
    var c = await vChannel.join();
  } catch(error) {
    console.error(`Error at play.js: ${error}`);
    return message.channel.send(`Failed to join voice channel: ${error}`);
  }
  
  const dispatcher = c.playStream(ytdl(args[0]))
  .on('end', () => {
    vChannel.leave();
  });
  dispatcher.setVolumeLogarithmic(5 / 5);
}

module.exports.help = {
  name: 'play',
  aliases: ['p']
}
const Discord = require('discord.js')

module.exports.run = async (client, msg, args) => {
  const message = args.join(' ')
  if (!message) return msg.channel.send(`Usage: ${module.exports.help.usage}`)
  return msg.channel.send(message)
}

module.exports.help = {
  name: 'say',
  description: 'Make me say what you want',
  usage: '!say (message)'
}
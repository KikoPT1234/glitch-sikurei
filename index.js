// Express
const express = require('express')
const app = express()
app.listen(process.env.PORT)
app.get('/', (request, response) => { 
  return response.send("<h1>HELLO</h1>"); 
});


// Package setup
const u = require('./utils.js')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()

// Command handler
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./commands', (err, files) => {
  if (!files) return console.log('There are no files to load...')
  const jsfiles = files.filter(f => f.split('.').pop() === 'js')
  jsfiles.forEach((file, index) => {
    const props = require(`./commands/${file}`)
    console.log(`${file} loaded!`)
    client.commands.set(props.help.name, props)
    if (props.help.aliases) props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name)
    })
  })
})

// Defining the prefix
client.prefix = '!'

// Message event
client.on('message', async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === 'dm') return;
  
  // Suggestion function
  if (msg.channel.name === 'suggestions' && !(msg.member.hasPermission('ADMINISTRATOR'))) {
    msg.delete(500)
    if (msg.content.startsWith(client.prefix)) return msg.channel.send('Please do not use commands in this channel.').then(message => message.delete(10000))
    if (msg.content.length < 10) return msg.channel.send('Your suggestion must be at least 10 words long!').then(message => message.delete(10000))
    const embed = new Discord.RichEmbed()
    .setAuthor(msg.guild.name, msg.guild.iconURL)
    .setTitle('**Suggestion**')
    .setColor('RANDOM')
    .addField('Suggestor', `**${msg.author.tag}** with ID ${msg.author.id}`)
    .addField('Time', msg.createdAt)
    .addField('Suggestion', msg.content)
    .setFooter(msg.client.user.username, msg.client.user.displayAvatarURL)
    .setTimestamp()
    const channel = msg.guild.channels.find(c => c.name === 'control-room')
    msg.channel.send('Your suggestion has been sent. Thanks!').then(message => message.delete(10000))
    return channel.send(embed)
  }
  
  if (!msg.content.startsWith(client.prefix)) return;
  
  // Command Runner
  const args = msg.content.slice(client.prefix.length).trim().split(' ')
  const cmd = args.shift().toLowerCase()
  let command
  if (client.commands.has(cmd)) {
    msg.delete(500).then(message => {
      command = client.commands.get(cmd)
      command.run(client, message, args)
    })
  } else if (client.aliases.has(cmd)) {
    msg.delete(500).then(message => {
      command = client.commands.get(client.aliases.get(cmd))
      command.run(client, message, args)
    })
  }
})

// Guild Member Add event
client.on('guildMemberAdd', async member => {
  member.addRole(member.guild.roles.find(r => r.name === 'Player'))
  member.guild.channels.find(c => c.name === 'welcome').send(`Welcome ${member} to the server! Please read the message sent above.`).then(msg => msg.delete(30000))
})

// Guild Member Remove event
client.on('guildMemberRemove', async (member) => {
  const message = Math.floor(Math.random() * 10) + 1
  try {
    var lChannel = member.guild.channels.find(c => c.name === 'join-leave')
    if (!lChannel) lChannel = member.guild.channels.find(c => c.name === 'general')
  } catch(e) {
    console.log(e)
  }
  const gPerson = member.user.username
  if(message === 1) {
    lChannel.send(`Goodbye **${gPerson}**, we will miss you!`);
  } else if(message === 2) {
    lChannel.send(`A wild **${gPerson}** has disappeared.`);
  } else if(message === 3) {
    lChannel.send(`Swoooosh. **${gPerson}** just took off.`);
  } else if(message === 4) {
    lChannel.send(`**${gPerson}** just left... Or did they?`);
  } else if(message === 5) {
    lChannel.send(`**${gPerson}** just left the server - glhf!`);
  } else if(message === 6) {
    lChannel.send(`Goodbye **${gPerson}**, we were expecting you to stay ( ͡° ͜ʖ ͡°)`);
  } else if(message === 7) {
   lChannel.send(`Roses are red, violets are blue, **${gPerson}** just left this server without you`); 
  } else if(message === 8) {
   lChannel.send(`Brace yourselves. **${gPerson}** just abandoned the server.`); 
  } else if(message === 9) {
   lChannel.send(`**${gPerson}** just left. Everyone, mess about while you can!`); 
  } else {
   lChannel.send(`**${gPerson}** just slid out of the server.`); 
  }
})

// Ready Event
client.on('ready', async () => {
  console.log(client.user.username + ' is ready!')
  client.user.setActivity('the Discord Server', {type: 'WATCHING'})
})

// Login
client.login(process.env.TOKEN).catch(e => console.log(e))
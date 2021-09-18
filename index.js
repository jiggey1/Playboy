// BOT PFP : https://cdn.discordapp.com/avatars/879225491452739615/fd899c243a836c48cf4828a633415723.webp?size=4096

const { Client, Collection, MessageAttachment, MessageEmbed, Intents } = require("discord.js");
const db = require('quick.db')
const config = require("./config.json");
const Canvas = require('canvas');
const { prefix, token } = require('./config.json');
global.botVersion = "v2.0";
global.botDev = "jiggey#4704";
global.botPFP = "https://cdn.discordapp.com/avatars/879225491452739615/fd899c243a836c48cf4828a633415723.webp?size=4096"
global.botInv = "https://discord.com/oauth2/authorize?client_id=879225491452739615&scope=bot&permissions=8"

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, 
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS);

const client = new Client({
    disableEveryone: true,
    intents: [myIntents],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", async (message) => {
  client.user.setStatus('dnd')
  client.user.setPresence({ activities: [{ name: '.help | jiggey#4704' }] });
  console.log(`Playboy Bunny <3 | Now Online And Ready `);
})

client.on("messageDelete", async(message) => {
  
  // Implementing Working & More Logging Features At A Later Date
  
  /*const logChannel = message.guild.channels.cache.find(c => c.name === "logs") || db.get(`guild_${message.guild.id}_logChannel`);

  if(!logChannel) {
    return
  }

  let logs = await message.guild.fetchAuditLogs({type: 72});
  let entry = logs.entries.first();

  const logEmbed = new MessageEmbed()
    .setAuthor(`Playboy`, `${global.botPFP}`, `${global.botInv}`)
    .setColor("ORANGE")
    .setTitle("Message Deleted")
    .addFields(
      { name: "Executor", value: `${entry.executor}`, inline: true},
      { name: "Channel", value: `${message.channel}`, inline: true },
      { name: "Message Author", value: `${entry.target}`, inline: true }//,
      //{ name: "Message Content", value: `${messageDelete.content}` }
    )
    .setFooter(`Message Deleted`)
    .setTimestamp()

  client.channels.cache.get(logChannel).send({ embeds: [logEmbed] });*/
})

client.on("messageUpdate", (messageDelete) => {
  // Future Update
})

client.on('messageReactionAdd', async (reaction, user, message) => { 		

  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  
  if (user.bot) return;
  if (!reaction.message.guild) return;
  
  if (reaction.message.channel.id === "879143329160384522") {
    if (reaction.emoji.name === "✅") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("879142663746625566");
    }
  } else {
    return;
  }
});

client.on("messageCreate", async message => {
  if (message.author.bot) return;

  const prefix = ".";

    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.substring(prefix.length).split(" ")
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);

});

client.login(config.token);
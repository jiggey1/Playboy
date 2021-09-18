const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  category: "info",
  description: "avatar Command",
  run: async (client, message, args) => {

    if (message.deletable) {
        message.delete();
    }

    let msg = await message.channel.send("Getting the requested avatar. Please wait...").then(m => {m.delete({ timeout: 1500 })});

    let mentionedUser = message.mentions.users.first() || message.author;

        const embed = new MessageEmbed()
        .setImage(mentionedUser.displayAvatarURL({dynamic : true}))
        .setColor("DARK_BLUE")
        .setAuthor(`Playboy`, `${global.botPFP}`, `${global.botInv}`)
        .setTitle(`${mentionedUser.username}#${mentionedUser.discriminator} Avatar`)
        .setFooter("Requested by " + message.author.tag)

        message.channel.send({ embeds: [embed] })
}}
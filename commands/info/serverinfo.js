const {MessageEmbed} = require('discord.js')

module.exports = {
    name: "serverinfo",
    category: "info",
    aliases: ['sinfo', 'server', 'si'],
    description: "ServerInfo Command",
    run: async (client, message, args) => {

        const serverlogo = message.guild.iconURL();
    
        function errorEmbed(errorMsg) {
            const errEmbed = new MessageEmbed()
            .setAuthor("Playboy", `${global.botPFP}`, `${global.botInv}`)
            .setTitle("I Ran Into An Error!")
            .setColor("RED")
            .setDescription(errorMsg)
            .setFooter("An Error Occurred.")
            .setTimestamp()

            message.channel.sennd({ embeds: [errEmbed] });
        }

        let embed = new MessageEmbed()
        .setColor("#ab8ed1")
        .setAuthor(`Atex`, `${global.botPFP}`, `${global.botInv}`)
        .addField("Server Info", `${message.guild}'s Information`)
        .setThumbnail(serverlogo)
        .addField("Server Owner  :crown:", `The Server Owner Is: ${message.guild.owner}`)
        .addField("Member Count  👤", `This Server Holds ${message.guild.memberCount} Members`)
        .addField("Emoji Count  :eyes:", `This Server Holds ${message.guild.emojis.cache.size} Custom Emoji's`)
        .addField("Roles Count  🆔", `This Server Holds ${message.guild.roles.cache.size} Roles`)

        message.channel.send({ embeds: [embed] });

    }
}
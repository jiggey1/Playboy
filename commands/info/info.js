const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require('pretty-ms');

module.exports = {
    name: "info",
    category: "info",
    description: "Info Command",
    run: async (client, message, args) => {

        const usersize = client.users.cache.size;
        const servsize = client.guilds.cache.size;
        
        const infoEmbed = new MessageEmbed()
        .setAuthor("Playboy", `${global.botPFP}`, `${global.botInv}`)
        .setTitle("Playboy's Information")
        .setColor("LUMINOUS_VIVID_PINK")
        .addFields(
            { name: "Name", value: "Playboy", inline: true },
            { name: "Version", value: `${global.botVersion}`, inline: true },
            { name: "Developer", value: `${global.botDev}`, inline: true },
            //{ name: "Servers", value: `${servsize}`, inline: true },
            //{ name: "Members", value: `${usersize}`, inline: true },
            { name: "Library", value: "Discord.JS", inline: true },
            { name: "Website", value: "Soon:tm:", inline: true },
            { name: "Playboy's Uptime", value: `${prettyMilliseconds(client.uptime)}` }
        )

        message.channel.send({ embeds: [infoEmbed] });

    }
}
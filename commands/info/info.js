const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "info",
    category: "info",
    description: "Info Command",
    run: async (client, message, args) => {
        
        const infoEmbed = new MessageEmbed()
        .setAuthor("Playboy", `${global.botPFP}`)
        .setTitle("Playboy's Information")
        .setColor("LUMINOUS_VIVID_PINK")
        .addFields(
            { name: "Name", value: "Playboy", inline: true },
            { name: "Version", value: `${global.botVersion}`, inline: true },
            { name: "Developer", value: `${global.botDev}`, inline: true },
            { name: "Library", value: "Discord.JS", inline: true },
            { name: "Website", value: "Soon:tm:", inline: true }
        )

        message.channel.send({ embeds: [infoEmbed] });

    }
}
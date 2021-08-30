const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "invite",
    category: "info",
    description: "Invite Command",
    run: async (client, message, args) => {
    
        const inviteEmbed = new MessageEmbed()
        .setAuthor("Playboy", `${global.botPFP}`, `${global.botInv}`)
        .setTitle("Invite Me :D")
        .setDescription(`[Click Here To Invite Me](${global.botInv})`)
        

        message.channel.send({ embeds: [inviteEmbed] })
    }
}
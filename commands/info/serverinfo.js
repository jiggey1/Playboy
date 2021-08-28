module.exports = {
    name: "serverinfo",
    category: "info",
    aliases: ['sinfo', 'server', 'si'],
    description: "ServerInfo Command",
    run: async (client, message, args) => {
    
        function errorEmbed(errorMsg) {
            const errEmbed = new MessageEmbed()
            .setAuthor("Playboy", `${global.botPFP}`)
            .setTitle("I Ran Into An Error!")
            .setColor("RED")
            .setDescription(errorMsg)
            .setFooter("An Error Occurred.")
            .setTimestamp()

            message.channel.sennd({ embeds: [errEmbed] });
        }

        

    }
}
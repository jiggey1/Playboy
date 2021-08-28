const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
    name: "mute",
    category: "moderation",
    description: "mute Command",
    run: async (client, message, args) => {

        function errorMessage(errorMsg) {
            const errorEmbed = new MessageEmbed()
            .setAuthor(`Playboy`, `${global.botPFP}`)
            .setTitle("An Error Occurred!")
            .setColor("RED")
            .setDescription(errorMsg)
            .setFooter("I ran into an error!")
            .setTimestamp()

            return message.channel.send({ embeds: [errorEmbed] });
        }
    
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MEMBERS)) {
            if(message.deletable) {
                message.delete().then(msg => {
                    setTimeout(() => msg.delete, 1000)
                });
            }

            message.channel.send("No permissions.").then(msg => {
                setTimeout(() => msg.delete, 1000)
            });
        }

        const mentionedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!mentionedUser) {
            return errorMessage("Please mention a user. Correct Usage: ``.mute <@user> [Reason]``");
        }

        const reason = args.slice(1).join(" ");

        if(!args[1]) {
            const succEmbed = new MessageEmbed()
            .setAuthor(`Playboy`, `${global.botPFP}`)
            .setTitle("Successfully Muted " + mentionedUser.username)
            .setColor("GREEN")
            .addFields(
                { name: "User Muted", value: `${mentionedUser}` },
                { name: "Muted By", value: `${message.author}` },
                { name: "Reason", value: "No Reason Specified." }
            )
            .setFooter("User Has Been Muted!")
            .setTimestamp()

            return message.channel.send({ embeds: [succEmbed] });
        } else {
            const succEmbed2 = new MessageEmbed()
            .setAuthor(`Playboy`, `${global.botPFP}`)
            .setTitle("Successfully Muted " + mentionedUser.username)
            .setColor("GREEN")
            .addFields(
                { name: "User Muted", value: `${mentionedUser}` },
                { name: "Muted By", value: `${message.author}` },
                { name: `Reason`, value: `${reason}` }
            )
            .setFooter("User Has Been Muted!")
            .setTimestamp()

            return message.channel.send({ embeds: [succEmbed2] });
        }
    
    }
}
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
    name: "unmute",
    category: "moderation",
    description: "unmute Command",
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
            return errorMessage("Please mention a user. Correct Usage: ``.unmute <@user>``");
        }

        const reason = args.slice(1).join(" ");

        const role = message.guild.roles.cache.find(r => r.name === "Muted");

        if(!args[1]) {
            try {
                const succEmbed = new MessageEmbed()
                .setAuthor(`Playboy`, `${global.botPFP}`)
                .setTitle(message.mentions.users.first().username + " Has Been Un-Muted")
                .setColor("GREEN")
                .addFields(
                    { name: "User Un-Muted", value: `${mentionedUser}` },
                    { name: "Un-Muted By", value: `${message.author}` },
                    { name: "Reason", value: "No Reason Specified." }
                )
                .setFooter("User Has Been Un-Muted!")
                .setTimestamp()

                mentionedUser.roles.remove(role);
                return message.channel.send({ embeds: [succEmbed] });
            }catch(e) {
                return errorMessage("Something went horribly wrong, and I cannot proceed with the muting command. Make sure the \"Muted\" role exists.")
            }
        } else {
            try {
                const succEmbed2 = new MessageEmbed()
                .setAuthor(`Playboy`, `${global.botPFP}`)
                .setTitle(message.mentions.users.first().username + " Has Been Un-Muted")
                .setColor("GREEN")
                .addFields(
                    { name: "User Un-Muted", value: `${mentionedUser}` },
                    { name: "Un-Muted By", value: `${message.author}` },
                    { name: `Reason`, value: `${reason}` }
                )
                .setFooter("User Has Been Un-Muted!")
                .setTimestamp()

                mentionedUser.roles.remove(role);
                return message.channel.send({ embeds: [succEmbed2] });
            
            }catch(e) {
                return errorMessage("Something went horribly wrong, and I cannot proceed with the muting command. Make sure the \"Muted\" role exists.")
            }
        }    
    }
}
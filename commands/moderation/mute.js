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

        // I wil be further implementing databases into this command at a later base.
    
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

        if(mentionedUser.id == message.author.id) {
            return errorMessage("You cannot mute yourself.");
        }

        const reason = args.slice(1).join(" ");

        const role = message.guild.roles.cache.find(r => r.name === "Muted");

        if(message.member.roles.cache.has(role)) {
            return errorMessage("User is already muted.");
        }

        if(!args[1]) {
            try {
                const succEmbed = new MessageEmbed()
                .setAuthor(`Playboy`, `${global.botPFP}`)
                .setTitle(message.mentions.users.first().username + " Is Now Muted" )
                .setColor("GREEN")
                .addFields(
                    { name: "User Muted", value: `${mentionedUser}` },
                    { name: "Muted By", value: `${message.author}` },
                    { name: "Reason", value: "No Reason Specified." }
                )
                .setFooter("User Has Been Muted!")
                .setTimestamp()

                mentionedUser.roles.add(role);
                return message.channel.send({ embeds: [succEmbed] });
            }catch(e) {
                return errorMessage("Something went horribly wrong, and I cannot proceed with the muting command. Make sure the \"Muted\" role exists.")
            }
        } else {
            try {
                const succEmbed2 = new MessageEmbed()
                .setAuthor(`Playboy`, `${global.botPFP}`)
                .setTitle(message.mentions.users.first().username + " Is Now Muted")
                .setColor("GREEN")
                .addFields(
                    { name: "User Muted", value: `${mentionedUser}` },
                    { name: "Muted By", value: `${message.author}` },
                    { name: `Reason`, value: `${reason}` }
                )
                .setFooter("User Has Been Muted!")
                .setTimestamp()
                
                mentionedUser.roles.add(role);
                return message.channel.send({ embeds: [succEmbed2] });
            }catch(e) {
                return errorMessage("Something went horribly wrong, and I cannot proceed with the muting command. Make sure the \"Muted\" role exists.")
            }
        }
    
    }
}
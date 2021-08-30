const { MessageEmbed, Permissions } = require("discord.js")

module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kick Command",
    run: async (client, message, args) => {

        if(args.length < 1) {

            const syntaxEmbed = new MessageEmbed()
            .setAuthor(`Playboy`, `${global.botPFP}`, `${global.botInv}`)
            .setTitle("Syntax Error!")
            .setColor("RED")
            .setDescription("You have used the command incorrectly. Please use: \n``.kick <@member> [Reason]``")
            .setFooter("Syntax Error")
            .setTimestamp()

            return message.channel.send({ embeds: [syntaxEmbed] }).then(msg => {
                setTimeout(() => msg.delete(), 5000)
            });
        }

        const reason = args.slice(1).join(" ");

        const mentionedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!mentionedUser) {

            const errorEmbed1 = new MessageEmbed()
            .setAuthor(`Playboy`, `${global.botPFP}`, `${global.botInv}`)
            .setTitle("Couldn't Find That User!")
            .setColor("RED")
            .setDescription("I had an issue completing this command since I could not find that user in the server! Please make sure you are mentioning a valid user.")
            .setFooter("Unknown User")
            .setTimestamp()

            return message.channel.send({ embeds: [errorEmbed1] });
        }

        if(mentionedUser.id == message.author.id) { 
            return message.channel.send("You cannot kick youself.").then(msg => {
             setTimeout(() => msg.delete(), 3500)
            });
        }

        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            return message.reply("You do not have permissions to run this command.");
        }

        if (!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            return message.reply("I do not have the permission to kick members! Please give me permissions to do so.");
        }

        if(!mentionedUser.kickable) {

            return message.channel.send("Sorry, I cannot kick this person. It could be because their role is higher than mine.");

        }

        if(!args[1]) {

            try {

                const successEmbed1 = new MessageEmbed()
                .setAuthor(`Playboy`, `${global.botPFP}`, `${global.botInv}`)
                .setTitle(message.mentions.users.first().username + " has been kicked.")
                .setColor("RED")
                .addFields(
                    { name: "Kicked Member:", value: `${mentionedUser}` },
                    { name: "Kicked By:", value: `${message.author.username}` },
                    { name: "Reason:", value: "No Reason Specified." }
                )

                message.channel.send({ embeds: [successEmbed1] })
                
                mentionedUser.kick({ reason: "No Reason Specified." })

            } catch(e) {

                console.log(e)
                return message.channel.send("Something went wront. The user has NOT been kicked.")

            }

        } else {

            try {

                const successEmbed2 = new MessageEmbed()
                .setAuthor(`Playboy`, `${global.botPFP}`, `${global.botInv}`)
                .setTitle(message.mentions.users.first().username + " has been kicked.")
                .setColor("RED")
                .addFields(
                    { name: "Kicked Member:", value: `${mentionedUser}` },
                    { name: "Kicked By:", value: `${message.author.username}` },
                    { name: "Reason:", value: reason }
                )

                message.channel.send({ embeds: [successEmbed2] })
                
                mentionedUser.kick({ reason: `${reason}` })

            } catch(e) {

                console.log(e)
                return message.channel.send("Something went wront. The user has NOT been kicked.")
                
            }

        }
    }
}
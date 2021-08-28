const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    category: "info",
    description: "Help Command",
    run: async (client, message, args) => {
        
        try {

            if(args.length == 0) {

                const helpEmbed = new MessageEmbed()
                .setAuthor(`Playboy`, `${global.botPFP}`)
                .setColor("#101010")
                .setTitle("Help Menu")
                .addFields(
                    { name: ".help info", value: "Shows help menu for information commands.", inline: true },
                    { name: ".help fun", value: "Shows help menu for fun commands.", inline: true },
                    { name: ".help moderation", value: "Shows help message for moderation commands.", inline: true }
                )
                .setTimestamp()
                .setFooter(`Playboy ${global.botVersion}`)

                return message.channel.send({ embeds : [helpEmbed] });
            
            } else if(args[0] == "info") {

                const infoEmbed = new MessageEmbed()
                .setAuthor(`Playboy`, `${global.botPFP}`)
                .setTitle("Information Commands")
                .addFields(
                    { name: "``.info``", value: "Displays information about the bot!" },
                    { name: "``.report``", value: "This will report the mentioned user for the reason specified." }
                )
                .setTimestamp()
                .setFooter(`Playboy ${global.botVersion}`)

                return message.channel.send({ embeds: [infoEmbed] })
            
            } else if(args[0] == "fun") {

                const funEmbed = new MessageEmbed()
                .setAuthor(`Playboy`, `${global.botPFP}`)
                .setTitle("Fun Commands")
                .addFields(
                    { name: "Much Empty.", value: "Some commands will be coming soon...", inline: true }
                )
                .setTimestamp()
                .setFooter(`Playboy ${global.botVersion}`)

                return message.channel.send({ embeds: [funEmbed] })

            } else if(args[0] == "moderation") {

                const modEmbed = new MessageEmbed()
                .setAuthor(`Playboy`, `${global.botPFP}`)
                .setTitle("Moderation Commands")
                .addFields(
                    { name: "``.announce [announcement]``", value: "This announces a message to the server by pinging everyone." },
                    { name: "``.ban <@Member> [Reason]``", value: "This bans the mentioned user for the reason, if specified." },
                    { name: "``.kick <@Member> [Reason]``", value: "This kicks the mentioned user for the reason, if specified."  },
                    { name: "``.janitor <1-100>``", value: "This will nuke the number of messages specified." },
                    { name: "``.mute <@Member> [Reason]``", value: "This will give the muted role to the user for the reason, if specified." },
                    { name: "``.unmute <@Member>``", value: "This will remove the muted role." }
                )
                .setTimestamp()
                .setFooter(`Playboy ${global.botVersion}`)

                return message.channel.send({ embeds: [modEmbed] })

            } else {

                const syntaxEmbed = new MessageEmbed()
                .setTitle("Syntax Error!")
                .setColor("RED")
                .setDescription("You have used the command incorrectly. Please use: \n``.help info``, ``.help fun``, ``.help moderation``")
                .setFooter("Syntax Error")
                .setTimestamp()
    
                return message.channel.send({ embeds: [syntaxEmbed] });

            }

        } catch(e) {
            console.log(e);

            const errorEmbed = new MessageEmbed()
            .setTitle("Oh No!")
            .setColor("RED")
            .setDescription("An error has occurred and the command failed to execute. The error is as follows: \n\n" + e)
            .setFooter("Error Embed")
            .setTimestamp()

            return message.channel.send({ embeds: [errorEmbed] });
        }

    }
}
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
    name: "mute",
    category: "moderation",
    description: "mute Command",
    run: async (client, message, args) => {
    
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MEMBERS)) {
            message.reply("No permissions.");
        }

        const mentionedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!mentionedUser) {
            const errorEmbed = new MessageEmbed()
            .setAuthor(`Playboy`, `${global.botPFP}`)
            .setTitle("Syntax Error")
            .setColor("RED")
            .setDescription("Please mention someone. Correct Usage: ``.mute <@user> <reason>``.")
            .setFooter("Syntax Error")
            .setTimestamp()

            message.channel.send({ embeds: [errorEmbed] });
        }

        if(!args[1]) {
            
        }
    
    }
}
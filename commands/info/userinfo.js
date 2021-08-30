const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "userinfo",
    category: "info",
    aliases: ['uinfo', 'user', 'ui'],
    description: "UserInfo Command",
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

        const taggedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!taggedUser) {
            const soloEmbed = new MessageEmbed()
            .setAuthor("Playboy", `${global.botPFP}`)
            .setTitle(message.author.username + "'s user information.")
            .setColor("DARK_VIVID_PINK")
            .setThumbnail(`${message.author.displayAvatarURL()}`)
            .addFields(
                { name: "Profile", value: `${message.author}`, inline: true },
                { name: "Discrim", value: `#${message.author.discriminator}`, inline: true },
                { name: "User Joined", value: `${moment(message.member.joinedAt)}` },
                { name: "User Registered", value: `${moment(message.member.user.createdAt)}` }
            )

            message.channel.send({ embeds: [soloEmbed] });
        } else {
            const soloEmbed = new MessageEmbed()
            .setAuthor("Playboy", `${global.botPFP}`)
            .setTitle(message.mentions.users.first().username + "'s user information.")
            .setColor("DARK_VIVID_PINK")
            .setThumbnail(`${taggedUser.user.displayAvatarURL()}`)
            .addFields(
                { name: "Profile", value: `${taggedUser}`, inline: true },
                { name: "Discrim", value: `#${taggedUser.user.discriminator}`, inline: true },
                { name: "User Joined", value: `${moment(taggedUser.joinedAt)}` },
                { name: "User Registered", value: `${moment(taggedUser.user.createdAt)}` }
            )

            message.channel.send({ embeds: [soloEmbed] });
        }

    }
}
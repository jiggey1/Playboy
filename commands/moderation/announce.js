const { MessageEmbed, MessageFlags, Permissions } = require("discord.js")
const db = require('quick.db')

module.exports = {
    name: "announce",
    category: "moderation",
    aliases: ['bc', 'broadcast', 'announcement'],
    description: "Announce command",
    run: async (client, message, args) => {

        if(message.deletable) {
            setTimeout(() => message.delete(), 50);
        }

        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return message.reply("You do not have permissions to run this command.").then(msg => {
                setTimeout(() => msg.delete, 3500)
            });
        }

        if(!args[0]) {
            return;
        }
    
        const content = args.slice(0).join(" ");


        const titleThing = db.get(`guild_${message.guild.id}_announceTitle`) || "New Announcement!";

        try {
            const announcementEmbed = new MessageEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
            .setColor("ORANGE")
            .setTitle(titleThing)
            .setDescription(content)
            .setFooter("Announcement Published: ")
            .setTimestamp()

            message.channel.send("@everyone");
            return message.channel.send({ embeds: [announcementEmbed] });

        } catch(e) {
            console.log(e);

            return message.channel.send("An error has prevented me from sending the announcement! Apologies about this.").then(msg => {
                setTimeout(() => msg.delete(), 10000)
            });
        }
    }
}
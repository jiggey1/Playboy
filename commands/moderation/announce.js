const { MessageEmbed, MessageFlags } = require("discord.js")

module.exports = {
    name: "announce",
    category: "moderation",
    aliases: ['bc', 'broadcast', 'announcement'],
    description: "Announce command",
    run: async (client, message, args) => {

        if(message.deletable) {
            message.delete();
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

        try {
            const announcementEmbed = new MessageEmbed()
            .setAuthor("Playboy", `${global.botPFP}`)
            .setColor("ORANGE")
            .setTitle("Announcement From " + message.author.username)
            .setDescription(content)
            .setFooter("Announcement Published: ")
            .setTimestamp()

            message.channel.send({ embeds: [announcementEmbed] });
            return message.channel.send("@everyone");

        } catch(e) {
            console.log(e);

            return message.channel.send("An error has prevented me from sending the announcement! Apologies about this.").then(msg => {
                setTimeout(() => msg.delete(), 10000)
            });
        }
    }
}
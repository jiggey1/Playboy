const { MessageEmbed, Permissions, MessageFlags } = require("discord.js")

module.exports = {
    name: "janitor",
    category: "moderation",
    aliases: ['nuke', 'purge', 'md', 'massdelete'],
    description: "Purge Command",
    run: async (client, message, args) => {

        function errorEmbed(errorMsg) {
            const errorEmbed = new MessageEmbed()
            .setAuthor("Playboy", `${global.botPFP}`)
            .setTitle("An Error Occurred!")
            .setColor("RED")
            .setDescription(errorMsg)
            .setFooter("Unexpected Error!")
            .setTimestamp()

            message.channel.send({ embeds: [errorEmbed] });
        }

        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return errorEmbed("You do not have the required permissions to do this!");
        }

        if(!args[0]) {
            return errorEmbed("Please give me a number between ``1`` and ``100``. \nThis is the amount of messages I will delete.");
        }

        if(args[0] == "0") {
            return errorEmbed("You cannot delete 0 messages. \nPlease enter a higher number and try again.");
        }

        let deleteAmount = args[0];

        message.channel.bulkDelete(deleteAmount, true).then(msg => {
            setTimeout(() => msg.delete, 10000)
        });

        const successEmbed = new MessageEmbed()
        .setAuthor("Playboy", `${global.botPFP}`)
        .setTitle(`Whew! I Deleted ${args[0]} messages!`)
        .setColor("NAVY")
        .setDescription("If some messages haven't been deleted, it could be because they are older than 14 days. Discord prevents me from deleting messages that far back. Sorry!")
        .setFooter("Command Executed!")
        .setTimestamp()

        message.channel.send({ embeds: [successEmbed] }).then(msg => {
            setTimeout(() => msg.delete, 5000)
        });
    }
}
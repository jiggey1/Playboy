const { MessageEmbed, Permissions } = require("discord.js")

module.exports = {
    name: "setup",
    category: "moderation",
    aliases: ['config', 'configure'],
    description: "Setup command",
    run: async (client, message, args) => {

        function newErrorEmbed(errorTitle, errorMsg, errorFooter) {
            const errorEmbed = new MessageEmbed()
            .setAuthor(`Playboy`, `${global.botPFP}`, `${global.botInv}`)
            .setTitle(errorTitle)
            .setColor("RED")
            .setDescription(errorMsg)
            .setFooter(errorFooter)
            .setTimestamp()
        
            message.channel.send({ embeds: [errorEmbed] });
        }

        function newHelpMenu(helpTitle, helpDesc, helpFooter) {
            const errorEmbed = new MessageEmbed()
            .setAuthor(`Playboy`, `${global.botPFP}`, `${global.botInv}`)
            .setTitle(helpTitle)
            .setColor("RED")
            .setDescription(helpDesc)
            .setFooter(helpFooter)
            .setTimestamp()
        
            message.channel.send({ embeds: [errorEmbed] });
        }

        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return newErrorEmbed("No Permissions!", "You have no permissions to run this command. \nPermission needed: ``MANAGE_MESSAGES``", "No Permissions.");
        }

        if(!args[0]) {
            return newErrorEmbed("Invalid Syntax", "You have not used the command correctly.\nPlease use on of the following: ``broadcast``, ``Coming Soon...``", "Syntax Error!");
        }

        if(args[0] == "announcement" && !args[1]) {
            return newHelpMenu("Announcement Options", "``title {newTitle}`` - You can set the announcement title to whatever you want.", "Announcement Config");
        }

        if(args[0] == "announcement" && args[1]) {
            // Placeholder
        }

    }
}
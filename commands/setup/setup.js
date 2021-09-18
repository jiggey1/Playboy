const { MessageEmbed, Permissions } = require("discord.js")
const db = require('quick.db')

module.exports = {
    name: "setup",
    category: "setup",
    aliases: ['config', 'configure', 'configuration'],
    description: "Setup command",
    run: async (client, message, args) => {

        function newErrorEmbed(errorTitle, errorMsg, errorFooter) { // Error Embed Function
            const errorEmbed = new MessageEmbed()
            .setAuthor(`Playboy`, `${global.botPFP}`, `${global.botInv}`)
            .setTitle(errorTitle)
            .setColor("RED")
            .setDescription(errorMsg)
            .setFooter(errorFooter)
            .setTimestamp()
        
            message.channel.send({ embeds: [errorEmbed] });
        }

        function newHelpMenu(helpTitle, helpDesc, helpFooter) { // Help Menu Embed Function
            const errorEmbed = new MessageEmbed()
            .setAuthor(`Playboy`, `${global.botPFP}`, `${global.botInv}`)
            .setTitle(helpTitle)
            .setColor("ORANGE")
            .setDescription(helpDesc)
            .setFooter(helpFooter)
            .setTimestamp()
        
            message.channel.send({ embeds: [errorEmbed] });
        }

        function newCompleteMsg(compTitle, compMsg, compFooter) { // Success Embed Function
            const errorEmbed = new MessageEmbed()
            .setAuthor(`Playboy`, `${global.botPFP}`, `${global.botInv}`)
            .setTitle(compTitle)
            .setColor("GREEN")
            .setDescription(compMsg)
            .setFooter(compFooter)
            .setTimestamp()
        
            message.channel.send({ embeds: [errorEmbed] });
        }

        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) { // Permission Check
            return newErrorEmbed("No Permissions!", "You have no permissions to run this command. \nPermission needed: ``MANAGE_MESSAGES``", "No Permissions.");
        }

        if(!args[0] || args[0] == "help") { // Syntax / Help Check
            return newHelpMenu("Configuration Menu", "**.setup announcement**\nShows all custom options for the announce command.\n\n**.setup mute**\nShows all custom options for the mute command.\n\n**.setup logChannel**\nShows all custom options for the logging channel.", "Configuration Help Menu")
        }

        // Announcement Command Section : Lightly Annotated.

        if(args[0] == "announcement" && !args[1]) {
            return newHelpMenu("Announcement Options", "``title {newTitle}`` - You can set the announcement title to whatever you want.", "Announcement Config");
        }

        if(args[0] == "announcement" && args[1] == "title") {
            const reason = args.slice(2).join(" "); // This joins all spaces after the 3rd arg.

            if(!args[2]) { // If no title is given, return this message and do nothing.
                return newErrorEmbed("Incorrect Usage!", "Please set a new announcement title.", "Incorrect Usage");
            }

            if(args[2] == "reset") { // If the third arg is "reset" it will delete the old title, and reset it to the new one (done automatically in announce.js), and return the success message.
                if(db.get(`guild_${message.guild.id}_announceTitle`) != null) {
                    db.delete(`guild_${message.guild.id}_announceTitle`); // Deletes the database entry.
                }

                return newCompleteMsg("Title Reset!", "Your announcement title has been reset to \"New Announcement!\".", "Title Reset To Default")
            }

            if(db.get(`guild_${message.guild.id}_announceTitle`) != null) { // If it isnt null, then delete the old entry, and add the new one, and send the success message.
                db.delete(`guild_${message.guild.id}_announceTitle`);
                db.set(`guild_${message.guild.id}_announceTitle`, `${reason}`);

                return newCompleteMsg("Success!", "Your new announcement title is:\n" + db.get(`guild_${message.guild.id}_announceTitle`), "successMsg1");
            } else { // else, set a new database entry, since there is no reason to delete a non-existing entry, and send success message.
                db.set(`guild_${message.guild.id}_announceTitle`, `${reason}`);
                
                return newCompleteMsg("Success!", "Your new announcement title is:\n" + db.get(`guild_${message.guild.id}_announceTitle`), "successMsg2");
            }
        }

        if(args[0] == "mute" && !args[1]) {
            return newHelpMenu("Mute Config Options", "``mutedRole {roleID}`` - Sets Muted role to custom role. \nDefault is \"Muted\"", "Mute Menu");
        }

        if(args[0] == "mute" && args[1] == "mutedRole") {

            if(!args[2]) {
                return newErrorEmbed("No Role Mentioned!", "Please give me a roleID that I can set it to your desired role.", "No Role Mentioned.");
            }

            const role = message.guild.roles.cache.find(`${args[2]}`);

            if(args[2] == "Muted" || args[2] == db.get(`guild_${message.guild.id}_muteRoleID`)) {
                return newErrorEmbed("Role Already Set!", "This is already your chosen role. Please choose a different role if you need to.", "Duplicate Entry")
            }

            if(args[2] == "reset") {
                db.delete(`guild_${message.guild.id}_muteRoleID`)
            }

            if(!role) {
                return newErrorEmbed("Role Not Found", "That role couldn't be found! Make sure its a valid role ID!", "Invalid Role");
            }

            if(db.get(`guild_${message.guild.id}_muteRoleID`) != null) {
                db.delete(`guild_${message.guild.id}_muteRoleID`)
                db.set(`guild_${message.guild.id}_muteRoleID`, args[2])

                return newCompleteMsg("Muted Role Set", "Muted Role Set To: " + db.get(`guild_${message.guild.id}_muteRoleID`), "Role Set");
            } else {
                db.set(`guild_${message.guild.id}_muteRoleID`, args[2])

                return newCompleteMsg("Muted Role Set", "Muted Role Set To: " + db.get(`guild_${message.guild.id}_muteRoleID`), "Role Set");
            }
        }

        if(args[0] == "logChannel" && !args[1]) {
            return newHelpMenu("Logs Config", "``logChannel {channelID}`` - Sets the logs channel up!\
            \n\n\nCurrent logChannel: " + db.get(`guild_${message.guild.id}_logChannel`), "Log Channels Config")
        }

        const channel = client.channels.cache.get(args[1])

        if(args[0] == "logChannel" && args[1] == "reset") {
            db.delete(`guild_${message.guild.id}_logChannel`)
            return message.channel.send("The logChannel Has Been Reset! It Is Now 'logs'.")
        }

        if(!channel) {
            return newErrorEmbed("Channel Not Found!", "That channel couldn't be found. Make sure its a valid channel ID!", "Channel Couldn't Be Found.")
        }

        if(db.get(`guild_${message.guild.id}_logChannel`) == channel) {
            return message.channel.send("This is already your logging channel. Nothing has been changed.")
        }

        if(args[0] == "logChannel" && args[1] == channel ) {
            
            try {
                if(db.get(`guild_${message.guild.id}_logChannel`) == null) {
                    db.set(`guild_${message.guild.id}_logChannel`, args[1])
                }

                if(db.get(`guild_${message.guild.id}_logChannel`) != null) {
                    db.delete(`guild_${message.guild.id}_logChannel`)
                    db.set(`guild_${message.guild.id}_logChannel`, args[1])
                }

                return newCompleteMsg("Channel Has Been Set!", "Your log channel has been set to ``" + channel + "``.", "Success Message")
            } catch(e) {
                return newErrorEmbed("Error!", "Something went wrong. Please make sure you are using a VALID channel ID. If this doesn't work, report a bug to my developers.")
            }

        } else {
            return newErrorEmbed("Channel Not Found!", "I couldn't find that channel. Make sure it exists, and you are mentioning the channel.", "No Channel Found")
        }

    }
}
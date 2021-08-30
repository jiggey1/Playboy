const { MessageEmbed, Permissions } = require("discord.js")

module.exports = {
    name: "ban",
    category: "moderation",
    description: "Ban Command",
    run: async (client, message, args) => {

        if(args.length < 1) {

            const syntaxEmbed = new MessageEmbed()
            .setAuthor(`Playboy`, `${global.botPFP}`, `${global.botInv}`)
            .setTitle("Syntax Error!")
            .setColor("RED")
            .setDescription("You have used the command incorrectly. Please use: \n``.ban <@member> [Reason]``")
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
            return message.channel.send("You cannot ban youself.").then(msg => {
             setTimeout(() => msg.delete(), 3500)
            });
        }

        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            return message.reply("You do not have permissions to run this command.");
        }

        if (!message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            return message.reply("I do not have the permission to ban members! Please give me permissions to do so.");
        }

        if(!mentionedUser.bannable) {

            return message.channel.send("Sorry, I cannot ban this person. It could be because their role is higher than mine.");

        }

        if(!args[1]) {

        try {

            const successEmbed1 = new MessageEmbed()
            .setAuthor(`Playboy`, `${global.botPFP}`, `${global.botInv}`)
            .setTitle(message.mentions.users.first().username + " has been banned!")
            .setColor("RED")
            .addFields(
                {name: "Member Banned:", value: `${mentionedUser}` },
                { name: "Banned By:", value: `${message.author.username}` },
                { name: "Ban Reason:", value: "No Reason Provided." }
            )
    
            
            message.channel.send({ embeds: [successEmbed1] });
            
            mentionedUser.ban({ reason: reason });

        } catch(e) {

            console.log(e);
            return message.channel.send("Something went seriously wrong! The user has not been banned.");
            
        }
        } else {

        try {
            
            const successEmbed2 = new MessageEmbed()
            .setAuthor(`Playboy`, `${global.botPFP}`, `${global.botInv}`)
            .setTitle(message.mentions.users.first().username + " has been banned!")
            .setColor("RED")
            .addFields(
                { name: "Member Banned:", value: `${mentionedUser}` },
                { name: "Banned By:", value: `${message.author.username}` },
                { name: "Ban Reason:", value: `${reason}` }
            )
            message.channel.send({ embeds: [successEmbed2] });

            mentionedUser.ban({ reason: reason });

        } catch(e) {
            console.log(e);
            return message.channel.send("Something went seriously wrong! The user has not been banned.");
        }
    }
    }
}
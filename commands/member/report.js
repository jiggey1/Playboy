const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "report",
    category: "member",
    description: "Report Command",
    run: async (client, message, args) => {

        function errorEmbed(errorMsg) {
            
            const errorEmbed = new MessageEmbed()
            .setAuthor(`Playboy`, `${global.botPFP}`, `${global.botInv}`)
            .setTitle("Sorry, I Ran Into An Error!")
            .setColor("NOT_QUITE_BLACK")
            .setDescription(errorMsg)
            .setFooter("Unexpected Error")
            .setTimestamp()

            return message.channel.send({ embeds: [errorEmbed] }).then(msg => {
                setTimeout(() => msg.delete, 6000)
            });
        }

        // I wil be further implementing databases into this command at a later base.

        const mentionedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
 
        if(message.deletable) {
            setTimeout(() => message.delete(), 1000);
        }

        try{

        const reportMessage = args.slice(1).join(" ");

        if(!mentionedUser) {
            return errorEmbed(`You need to mention a user. Please make sure you mention a user and give valid information in order to complete this command.`);
        }

        if(!args[1]) {
            return errorEmbed(`You need to give a reason, you CANNOT leave this field blank.`);
        }

        message.channel.send(message.author.username + ", your report has been sent, thank you.")
        .then(msg => {
            setTimeout(() => msg.delete, 5000)
        });

        const reportEmbed = new MessageEmbed()
        .setAuthor(`Playboy`, `${global.botPFP}`, `${global.botInv}`)
        .setTitle("Report from " + message.author.username)
        .setColor("YELLOW")
        .addFields(
            { name: "Reported User:", value: `${mentionedUser}` },
            { name: "Reported By:", value: `${message.author}` },
            { name: "Reason:", value: `${reportMessage}` }
        )
        .setFooter("Time Reported")
        .setTimestamp()
        
        const channel1 = client.channels.cache.get('880034130417561621');

        channel1.send({ embeds: [reportEmbed] });
        
    }catch(e) {
        console.log(e);
        return errorEmbed(`I ran into a real error and the command execution failed. Please try again.`);
    }

    }

}
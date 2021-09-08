const { Permissions } = require("discord.js");

module.exports = {
    name: "postrules",
    category: "admin",
    description: "Reacts to the servers rules.",
    run: async (client, message, args) => {

        if(message.deletable) {
           setTimeout(() => message.delete(), 50);
        }
    
        if (!message.author.id('350692507199209494') || message.author.id('301063072934526987')) {
            return message.channel.send("This command is only accessible to my owner, jiggey#4704. **__Please Don't Try To Use This. It's just embarrassing__**")
        }

        // I wil be further implementing databases into this command at a later base.

        if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            
            message.channel.messages.fetch("879159959898714112").then( msg => msg.react('✅') );

        } else {
           return message.channel.send("You do not have the permissions to run this command.").then(msg => {
                setTimeout(() => msg.delete(), 5000)
            })
        }

    }
}
const { Permissions } = require("discord.js");

module.exports = {
    name: "noverify",
    category: "admin",
    description: "Removes reaction in the rare case that we get raided.",
    run: async (client, message, args) => {

        if(message.deletable) {
            setTimeout(() => message.delete(), 50);
        }

        if (!message.author.id != '350692507199209494' || message.author.id != '301063072934526987') {
            return message.channel.send("This command is only accessible to my owner, jiggey#4704. **__Please Don't Try To Use This. It's just embarrassing__**")
        }
    
        // I wil be further implementing databases into this command at a later base.
    
        if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
        
            try {
                const msg = await message.channel.messages.fetch('879159959898714112');
            
                msg.reactions.resolve("✅").remove();
            
            }catch(e) {
            
                message.channel.send("Error! \n\n" + e).then(msg => {
                    setTimeout(() => msg.delete(), 5000)
                });
            }
        
        } else {
           return message.channel.send("You do not have the permissions to run this command.").then(msg => {
                setTimeout(() => msg.delete(), 5000)
            })
        }

    }
}
module.exports = {
    name: "reload",
    category: "owner",
    description: "RELOAD COMMANDS COMMAND",
    run: async (client, message, args) => {
        
    if(message.deletable) {
        setTimeout(() => message.delete(), 50)
    }

    if (message.author.id !== '350692507199209494') {
         return message.channel.send("This command is only accessible to my owner, jiggey#4704. **__Please Don't Try To Use This. It's just embarrassing__**")
    }

    if (!args.length) {
         return message.channel.send(`You didn't pass any command to reload!`);
    }
           
    const commandCategory = args[0].toLowerCase();
        const commandName = args[1];

        if(message.client.commands.get(commandName)){
            const command = message.client.commands.get(commandName) ||
            message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command) {
                 return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
            }
            delete require.cache[require.resolve(`../../commands/${commandCategory}/${command.name}.js`)];
        }

        try {
            const newCommand = require(`../../commands/${commandCategory}/${commandName}`);
            message.client.commands.set(commandName, newCommand);
            message.channel.send("Command `" + commandName+ ".js` was reloaded!").then(msg => {
                setTimeout(() => msg.delete(), 2500)
            });
        } catch (e) {
            return message.channel.send("There was an error while reloading the `" + '<' + commandName + `\` command. \n\nError is as follows:\n\`\`${e}\`\``);
        }
    },
};
const got = require('got');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "meme",
    category: "games",
    description: "Meme Command",
    run: async (client, message, args) => {
    
    message.channel.sendTyping();
    const subReddits = ["dankmeme", "meme", "me_irl", "memes", "boomermeme", "memeeconomy"];
        
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const embed = new MessageEmbed();
    got(`https://www.reddit.com/r/${random}/random/.json`).then(response => {
        
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeDownvotes = content[0].data.children[0].data.downs;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        embed.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
        embed.setImage(memeImage);
        embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`);
        embed.setAuthor(`Playboy`, `${global.botPFP}`, `${global.botInv}`)

        message.channel.send( { embeds: [embed] } )
    })

}}
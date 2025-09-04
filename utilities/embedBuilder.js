const Discord = require("discord.js");
const { picsURL, picsPath } = require("./consts");

const embedColor = '412132'


const embedReply = (message) =>{
	return new Discord.EmbedBuilder()
	.setColor(embedColor)
	.setDescription(message);
}

const embedRollResult = (text, type) => {
    
    return new Discord.EmbedBuilder()
    .setColor(embedColor)
	.setThumbnail(picsURL + type + '.png' + '?raw=true')
	.setDescription(text)
	.setImage('attachment://dice.png')
}


module.exports = {embedReply, embedRollResult, embedColor}
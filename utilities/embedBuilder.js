const Discord = require("discord.js");

const embedColor = '412132'
const picsPath = './dice_pics/'
const picsURL = 'https://github.com/therekha/bladesinthedarkbot/blob/trunk/dice_pics/'

const embedReply = (message) =>{
	return new Discord.EmbedBuilder()
	.setColor(embedColor)
	.setDescription(message);
}

const embedRollResult = (text, type) => {
    const attachment = new Discord
        .AttachmentBuilder( picsPath + 'composite.png', 'dice.png');
    
    return new Discord.EmbedBuilder()
    .setColor(embedColor)
	.setThumbnail(picsURL + type + '.png' + '?raw=true')
	.setDescription(text)
	//.attachFiles(attachment)
	//.setImage('attachment://dice.png')
}


module.exports = {embedReply, embedRollResult, embedColor}
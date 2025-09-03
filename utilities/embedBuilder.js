const Discord = require("discord.js");

const embedColor = '#412132'
const picsURL = './dice_pics/'

const embedReply = (message) =>{
	return new Discord.EmbedBuilder()
	.setColor(embedColor)
	.setDescription(message);
}

const rollResult = (text, type) => {
    const attachment = new Discord
        .AttachmentBuilder( picsURL + 'composite.png', 'dice.png');
    
    return new Discord.EmbedBuilder()
    .setColor(embedColor)
	//.setThumbnail(picsURL + type + '.png' + '?raw=true')
	.setDescription(type + '! ' + text)
	//.attachFiles(attachment)
	//.setImage('attachment://dice.png')
}


module.exports = {embedReply, rollResult}
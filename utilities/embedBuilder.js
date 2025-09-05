const Discord = require("discord.js");
const { repoURL, picsPath } = require("./consts");
const { pullDevilsBargain } = require("./lookups");

const embedColor = '412132'


const embedReply = (message) =>{
	return new Discord.EmbedBuilder()
	.setColor(embedColor)
	.setDescription(message);
}

const embedRollResult = (text, type) => {
    
    return new Discord.EmbedBuilder()
    .setColor(embedColor)
	.setThumbnail(repoURL + 'dice_pics/' + type + '.png' + '?raw=true')
	.setDescription(text)
	.setImage('attachment://dice.png');
}

const embedDevilsBargain = (text, image) => {
    console.log(image)
    return new Discord.EmbedBuilder()
    .setColor(embedColor)
    .setDescription(text)
    .setImage(image);
}


module.exports = {embedReply, embedRollResult, embedColor, embedDevilsBargain}
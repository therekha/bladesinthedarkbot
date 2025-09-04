const Canvas = require('@napi-rs/canvas');
const {picsURL, picsPath } = require('./consts')
const {AttachmentBuilder} = require("discord.js");

const diceWidth = 100
const diceHeight = 106

const drawDice = async (rolls, result) => {
	imageArray = getPics(rolls, result);
	finalimg =  await combineDice(imageArray);
	return finalimg;
}

const getPics = (rolls, result) => {

    pics = [];
    rolls.forEach((value, index) => {
        // create the array of image urls that will be used
        // plain if it's not the result
        if(value !== result) pics.push(picsURL + 'plain/'+ value.toString() + '.png');
        // gold if it is
        else if (value === result) pics.push(picsURL + 'gold/'+ value.toString() + '.png');
    });
	return pics;
}

const combineDice = async (dicePics) => {
	const canvasWidth = dicePics.length < 5 ? dicePics.length * diceWidth : 5 * diceWidth;
	const canvasHeight = Math.ceil(dicePics.length / 5 ) * diceHeight;
	const canvas = Canvas.createCanvas(canvasWidth, canvasHeight);
	const context = canvas.getContext('2d');

	dicePics.forEach(async (pic, index) => {
		x = ((index)%5)*100
		y = Math.floor((index)/5)*106

		const image = await Canvas.loadImage(pic);
	
		context.drawImage(image, x, y, 100, 106)
	});

	const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'dice.png' });
	return attachment;
}

module.exports = { drawDice }
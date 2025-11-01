const Canvas = require('@napi-rs/canvas');
const { picsPath } = require('./consts')
const {AttachmentBuilder} = require("discord.js");
const { promises } = require('node:fs')

const diceWidth = 100
const diceHeight = 106

//TODO error handling

const drawDice = async (rolls, result, saveLoc) => {
	imageArray = getPics(rolls, result);
	finalimg =  await combineDice(imageArray, saveLoc);
	return finalimg;
}

const getPics = (rolls, result) => {

    pics = [];
    rolls.forEach((value, index) => {
        // create the array of image urls that will be used
        // plain if it's not the result
        if(value !== result) pics.push(picsPath + 'plain/'+ value.toString() + '.png');
        // gold if it is
        else if (value === result) pics.push(picsPath + 'gold/'+ value.toString() + '.png');
    });
	return pics;
}

const combineDice = async (dicePics, saveLoc) => {
	const canvasWidth = dicePics.length < 5 ? dicePics.length * diceWidth : 5 * diceWidth;
	const canvasHeight = Math.ceil(dicePics.length / 5 ) * diceHeight;
	const canvas = Canvas.createCanvas(canvasWidth/2, canvasHeight/2);
	const context = canvas.getContext('2d');

	let index = 0;
	for(pic of dicePics) {
		let x = ((index)%5)*diceWidth/2
		let y = Math.floor((index)/5)*diceHeight/2

		const image = await Canvas.loadImage(pic);

		context.drawImage(image, x, y, image.width/2, image.height/2);
		index++;
	}

	(() => {})();

	const pngData = await canvas.encode('png') // JPEG, AVIF and WebP are also supported

	if(saveLoc){
  		await promises.writeFile( picsPath + saveLoc, pngData)
	}

	const attachment = new AttachmentBuilder(pngData, { name: 'dice.png' });
	return attachment;
}

module.exports = { drawDice, getPics }
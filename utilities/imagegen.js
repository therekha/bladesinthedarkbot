const Canvas = require('@napi-rs/canvas');
const {picsURL, picsPath } = require('./consts')
const {AttachmentBuilder} = require("discord.js");
const { promises } = require('node:fs')

const diceWidth = 100
const diceHeight = 106

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
	const canvas = Canvas.createCanvas(canvasWidth, canvasHeight);
	const context = canvas.getContext('2d');

	dicePics.forEach(async (pic, index) => {
		x = ((index)%5)*100
		y = Math.floor((index)/5)*106

		const image = await Canvas.loadImage(pic);
	
		context.drawImage(image, x, y, 100, 106)
	});

	const pngData = await canvas.encode('png') // JPEG, AVIF and WebP are also supported

	if(saveLoc){
		console.log(picsPath + saveLoc);
  		await promises.writeFile( picsPath + saveLoc, pngData)
	}

	const attachment = new AttachmentBuilder(pngData, { name: 'dice.png' });
	return attachment;
}

module.exports = { drawDice }
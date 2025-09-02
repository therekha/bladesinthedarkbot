function getPics(rolls, result){
    const dicePicURL = 'embeds/dice_pics/';

    pics = [];
    data.rolls.forEach((value, index) => {
        // create the array of image urls that will be used
        // plain if it's not the result
        if(value !== result) pics.push(dicePicURL + 'plain/'+ value.toString() + '.png');
        // gold if it is
        else if (value === result) pics.push(dicePicURL + 'gold/'+ value.toString() + '.png');
    });
}

export async function drawDice(rolls, msg, text) {
	var jimps = [jimp.read('dice_pics/canvas.png')]
	dicePics.forEach((image, i) => {
		jimps.push(jimp.read(image))
	});

	await Promise.all(jimps).then(function(data) {
		return Promise.all(jimps)
	}).then(async function(data){
		// --- THIS IS WHERE YOU MODIFY THE IMAGES --- \\
		if(dicePics.length < 5){
			width = dicePics.length * 100;
			height = 106;
		}
		else{
			width = 5 * 100;
			height = Math.ceil(dicePics.length/5) * 106
		}
		data[0].resize(width, height)
		data.forEach((pic, index) => {
			if(index !== 0){
			x = ((index-1)%5)*100
			y = Math.floor((index-1)/5)*106
			data[0].composite(data[index], x, y)
			}
		});
		data[0].resize(width/2, height/2, jimp.RESIZE_NEAREST_NEIGHBOR)
		await data[0].write('embeds/dice_pics/composite.png');
	});
}
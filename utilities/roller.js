const Math = require('mathjs');

const rollDice = (diceToRoll) => {
    if(diceToRoll > 20) throw "I'm limited to rolling 20 dice at a time. I hope you don't mind!";
    if(diceToRoll < 1) throw "You can't roll less than one die..."

    const dice = diceToRoll || 2; //Handles 0d rolls.

    rolls = []
    for (i = 1; i <= dice; i++) {
        //THIS IS THE ROLL
        rolls.push(Math.floor(Math.random() * 6 + 1));
    }
    
    if (diceToRoll === 0) {
        return rolls, Math.min(...rolls);; //Rolled 2d, take lowest
    } else {
        return rolls, Math.max(...rolls); //Take highest of rolls
    }
 }



 //TODO entanglement roll 


module.exports = { rollDice }
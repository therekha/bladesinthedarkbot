const Math = require('mathjs');

const rollDice = (diceToRoll) => {
    if(diceToRoll > 9) throw "I'm limited to rolling 9 dice at a time. I hope you don't mind!";
    if(diceToRoll < 0) throw "You can't roll less than zero dice..."

    const dice = diceToRoll || 2; //Handles 0d rolls.

    rolls = []
    result = 0

    for (i = 1; i <= dice; i++) {
        //THIS IS THE ROLL
        rolls.push(Math.floor(Math.random() * 6 + 1));
    }
    


    if (diceToRoll === 0) {
        result = Math.min(...rolls)  //Rolled 2d, take lowest
    } else {
        result = Math.max(...rolls)  //Take highest of rolls
    }

    let terp = interpretResult(rolls, result);

    return{
        result: result,
        text: terp.text,
        type: terp.type,
        rolls: rolls
    }
 }

const interpretResult = (rolls, result) => {
    let interpretation = result.toString() + ' from ';
    let sixcount = 0;
    let typeText = '';

    for(res of rolls){
        if(res === result){
            interpretation += ('**' + res.toString() + '** ')
        }
        else{
            interpretation += (res.toString() + ' ')
        }
        if(res === 6) {
            sixcount++;
        }
    }

    if(sixcount > 1){
        typeText = 'critical';
    }
    else if (result >= 6){
        typeText = 'success';
    }
    else if (result >= 4){
        typeText = 'partial';
    }
    else if (result <= 3){
        typeText = 'failure';
    }

    return {
        text: interpretation,
        type: typeText
    }
}

 //TODO entanglement roll 


module.exports = { rollDice, interpretResult }
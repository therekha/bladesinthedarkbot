const { rollDice } = require('./utilities/roller');

// Tools for handling heat-related results. Primarily entanglement.
const entangle = (heat, wantedLevel) => {
    // set "level" to determine the heat table column
    let heatTier = 1;
    if(heat < 4){
        heatTier = 0;
    }
    else if( heat > 5 ){
        heatTier = 2
    }

    // get the row with a roll
    let roll = rollDice(wantedLevel);

    //oh this is expanded entanglement so i guess theres MORE ROWS !
}
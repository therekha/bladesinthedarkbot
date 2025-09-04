const { embedReply, embedRollResult } = require("./embedBuilder");
const { rollDice } = require("./roller")

parseCommand = (message) => {
	commandArray = message.split(' '); //break command into parts
	command = commandArray[0].slice(1).toLowerCase(); //remove dat dollar sign

    if (!isNaN(command)) {
        noDice = parseInt(command);
        return runBasicRoll(noDice);
    }
    else{
        return embedReply("Command not recognised.");
    }
}

runBasicRoll = (noDice) => {
    try {
        let data = rollDice(noDice); 
        return embedRollResult(data.text, data.type);

    } catch (error) {
        return embedReply(error);
    }
}

module.exports = { parseCommand };
const { embedReply, embedRollResult } = require("../utilities/embedBuilder");
const { rollDice, resistRoll } = require("../utilities/roller")

parseCommand = (message) => {
	commandArray = message.split(' '); //break command into parts
	command = commandArray[0].slice(1).toLowerCase(); //remove dat dollar sign

    if (command && !isNaN(command)) {
        noDice = parseInt(command);
        return runBasicRoll(noDice);
    }
    else if(command[0] === 'r'){
        command = command.slice(1);
        if (command && !isNaN(command)) {
            noDice = parseInt(command);
            return runResistanceRoll(noDice);
        }
        else{
            return embedReply("Command not recognised.");
        }
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

runResistanceRoll = (noDice) => {
    try {
        let data = resistRoll(noDice);
        return embedRollResult(data.text, data.type);

    } catch (error) {
        return embedReply(error);
    }
}

module.exports = { parseCommand };
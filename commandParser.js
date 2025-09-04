const { embedReply, embedRollResult } = require("./utilities/embedBuilder");
const { drawDice } = require("./utilities/imagegen");
const { rollDice, resistRoll } = require("./utilities/roller")

parseCommand = async (message) => {
	commandArray = message.split(' '); //break command into parts
	command = commandArray[0].slice(1).toLowerCase(); //remove dat dollar sign

    if (command && !isNaN(command)) {
        noDice = parseInt(command);
        return await runBasicRoll(noDice);
    }
    else if(command[0] === 'r'){
        command = command.slice(1);
        if (command && !isNaN(command)) {
            noDice = parseInt(command);
            return await runResistanceRoll(noDice);
        }
        else{
            return {embeds: [embedReply("Command not recognised.")]};
        }
    }
    else{
        return {embeds: [embedReply("Command not recognised.")]};
    }
}

runBasicRoll = async (noDice) => {
    try {
        let data = rollDice(noDice); 
        let image = await drawDice(data.rolls, data.result)
       return {embeds: [embedRollResult(data.text, data.type)], files: [image]};

    } catch (error) {
        return {embeds: [embedReply(error)]};
    }
}

runResistanceRoll = async (noDice) => {
    try {
        let data = resistRoll(noDice);
        let image = await drawDice(data.rolls, data.result)

        return {embeds: [embedRollResult(data.text, data.type)], files: [image]};

    } catch (error) {
         return {embeds: [embedReply(error)]};
    }
}

module.exports = { parseCommand };
const { embedReply, embedRollResult, embedNonActionRollResult, embedDevilsBargain } = require("./utilities/embedBuilder");
const { drawDice } = require("./utilities/imagegen");
const { rollDice, resistRoll } = require("./utilities/roller")
const { actions, describeAction, pullDevilsBargain, help } = require("./utilities/lookups");
const { entangle } = require("./utilities/heat.js");

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
    else if(command === 'db' || command === 'devilsbargain'){
        let bargain = pullDevilsBargain();
        return {embeds: [embedDevilsBargain(bargain.text, bargain.image)]};
    }
    else if(command === 'help'){
        let helpText = help();
        return {embeds: [embedReply(helpText)]};
    }
    else if(command === 'entangle'){
        let heat = parseInt(commandArray[1]);
        let wanted = parseInt(commandArray[2]);
        if(!isNaN(heat) && !isNaN(wanted)){
            return await runEntangleRoll(heat, wanted);
        }
        else{
            return {embeds: [embedReply("Format for entanglement roll is \` $entangle <heat> <wanted level> \`")]};
        }
    }
    else if(actions.includes(command) ){
        return {embeds: [embedReply(describeAction(command))]};
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

runEntangleRoll = async (heat, wanted) => {
    try {
        let data = entangle(heat, wanted);
        let image = await drawDice(data.roll.rolls, data.roll.result);
        
        return {embeds: [embedNonActionRollResult(data.message)], files: [image]};
    } catch (error) {
        return {embeds: [embedReply(error.message)]};
    }
}

module.exports = { parseCommand };
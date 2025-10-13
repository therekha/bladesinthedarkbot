const { SlashCommandBuilder } = require('discord.js');
const { resistRoll } = require('../../utilities/roller');
const { embedReply, embedNonActionRollResult } = require('../../utilities/embedBuilder');
const { drawDice } = require('../../utilities/imagegen');
const { entangle } = require('../../utilities/heat.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('entangle')
		.setDescription('Roll for entanglement result.')	
        .addIntegerOption(option =>
			option
				.setName('heat')
				.setDescription('Heat level, from 0 to 9.')
				.setRequired(true))
        .addIntegerOption(option =>
			option
				.setName('wantedlevel')
				.setDescription('Wanted level, from 0 to 4.')
				.setRequired(true)),
	async execute(interaction) { 
		try {
            let data = entangle(interaction.options.getInteger('heat'), 
                interaction.options.getInteger('wantedlevel'));
			let image = await drawDice(data.roll.rolls, data.roll.result)
			let reply = embedNonActionRollResult(data.message);
			await interaction.reply({ embeds: [reply], files: [image] });
		} catch (error) {
            //this is brokenn
			await interaction.reply({ embeds: [reply] });
		}
	},
};
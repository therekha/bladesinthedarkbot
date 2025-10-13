const { SlashCommandBuilder } = require('discord.js');
const { rollDice } = require('../../utilities/roller');
const { embedReply, embedRollResult } = require('../../utilities/embedBuilder');
const { drawDice } = require('../../utilities/imagegen');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Standard roll for an action.')	
        .addIntegerOption(option =>
			option
				.setName('dice')
				.setDescription('Number of dice being rolled.')
				.setRequired(true)),
	async execute(interaction) { //gotta keep this function 2 lines
		try {
			let data = rollDice(interaction.options.getInteger('dice')); 
			let image = await drawDice(data.rolls, data.result)
			let reply = embedRollResult(data.text, data.type);
			await interaction.reply({ embeds: [reply], files: [image] });
		} catch (error) {
			let reply = embedReply(error.message);
			await interaction.reply({ embeds: [reply] });
		}
	},
};
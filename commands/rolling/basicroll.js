const { SlashCommandBuilder } = require('discord.js');
const { rollDice } = require('../../utilities/roller')
const { embedReply, rollResult } = require('../../utilities/embedBuilder')

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
			let reply = rollResult(data.text, data.type);
			await interaction.reply({ embeds: [reply] });
		} catch (error) {
			let reply = embedReply(error);
			await interaction.reply({ embeds: [reply] });
		}
	},
};
const { SlashCommandBuilder } = require('discord.js');
const { resistRoll } = require('../../utilities/roller')
const { embedReply, embedRollResult } = require('../../utilities/embedBuilder')
const { drawDice } = require('../../utilities/imagegen')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resist')
		.setDescription('Roll to resist a consequence.')	
        .addIntegerOption(option =>
			option
				.setName('dice')
				.setDescription('Number of dice being rolled - from the attribute being used (Insight, Prowess, or Resolve).')
				.setRequired(true)),
	async execute(interaction) { //gotta keep this function 2 lines
		try {
			let data = resistRoll(interaction.options.getInteger('dice')); 
			let image = await drawDice(data.rolls, data.result)
			let reply = embedRollResult(data.text, data.type);
			await interaction.reply({ embeds: [reply], files: [image] });
		} catch (error) {
			let reply = embedReply(error);
			await interaction.reply({ embeds: [reply] });
		}
	},
};
const { SlashCommandBuilder } = require('discord.js');
const { rollDice } = require('../../utilities/roller')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Standard roll for an action.')	
        .addIntegerOption(option =>
			option
				.setName('dice')
				.setDescription('Number of dice being rolled.')
				.setRequired(true)),
	async execute(interaction) {
        let rolls, result = rollDice(interaction.options.getInteger('dice'));
		const mssg = 'You rolled a ' + result;
		await interaction.reply(mssg);
	},
};
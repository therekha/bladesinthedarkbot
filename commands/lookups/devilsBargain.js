const { SlashCommandBuilder } = require('discord.js');
const { pullDevilsBargain } = require('../../utilities/lookups');
const { embedReply, embedDevilsBargain } = require('../../utilities/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('devilsbargain')
		.setDescription('Pull a random Devil\'s Bargain.'),
	async execute(interaction) { 
		try {
            let bargain = pullDevilsBargain();
            await interaction.reply({embeds: [embedDevilsBargain(bargain.text, bargain.image)]});
		} catch (error) {
			let reply = embedReply(error);
			await interaction.reply({ embeds: [reply] });
		}
	},
};
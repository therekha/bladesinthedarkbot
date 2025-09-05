const { SlashCommandBuilder } = require('discord.js');
const { help } = require('../../utilities/lookups');
const { embedReply } = require('../../utilities/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Learn how to use the bot.'),
	async execute(interaction) { 
		try {
            let helpText = help();
            await interaction.reply({embeds: [embedReply(helpText)]});
		} catch (error) {
			let reply = embedReply(error);
			await interaction.reply({ embeds: [reply] });
		}
	},
};
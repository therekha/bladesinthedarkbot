const { SlashCommandBuilder } = require('discord.js');
const { describeAction } = require('../../utilities/lookups');
const { embedReply } = require('../../utilities/embedBuilder');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('action')
		.setDescription('Look up the definition of an action.')	
        .addStringOption(option =>
            option.setName('action')
                .setDescription('The name of the action to look up.')
                .setRequired(true)
                .addChoices(
                    { name: 'Hunt', value: 'hunt' },
                    { name: 'Study', value: 'study' },
                    { name: 'Survey', value: 'survey' },
                    { name: 'Tinker', value: 'tinker' },
                    { name: 'Finesse', value: 'finesse' },
                    { name: 'Prowl', value: 'prowl' },
                    { name: 'Skirmish', value: 'skirmish' },
                    { name: 'Wreck', value: 'wreck' },
                    { name: 'Attune', value: 'attune' },
                    { name: 'Command', value: 'command' },
                    { name: 'Consort', value: 'consort' },
                    { name: 'Sway', value: 'sway' }
                )),
	async execute(interaction) { 
		try {
			let description = describeAction(interaction.options.getString('action'));
            let reply = embedReply(description);
			await interaction.reply({ embeds: [reply] });
		} catch (error) {
			let reply = embedReply(error);
			await interaction.reply({ embeds: [reply] });
		}
	},
};
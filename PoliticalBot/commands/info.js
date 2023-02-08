const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

// pages

const start_embed = new MessageEmbed()
  .setColor("#59ff72")
  .setTitle("Select a option to learn more")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription("Get Information on the Experiment"),
	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Basic Info',
							description: 'Basic Information on what this experiment is',
							value: 'basic_info_option',
						},
						{
							label: 'Goverment',
							description: 'Learn More on the goverment',
							value: 'goverment_option',
						},
					]),
			);
      await interaction.reply({components: [row], embeds: [start_embed]})
	},
};
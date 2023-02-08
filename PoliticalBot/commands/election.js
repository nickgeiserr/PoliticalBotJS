const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const missingEmbed = new MessageEmbed()
  .setColor("#ff6e75")
  .setTitle("Missing Permission")
  .setDescription("You are missing the role : **Goverment**")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('election')
		.setDescription('Start a election stage.'),
	async execute(interaction) {
    if (!interaction.member.roles.cache.some(role => role.name === 'Goverment')) {
      await interaction.reply({embeds: [missingEmbed]});
      return;
    }
    	const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
					.setCustomId('search')
					.setLabel('Search')
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('prep')
					.setLabel('Prep')
					.setStyle('PRIMARY'),
			  new MessageButton()
				  	.setCustomId('speak')
					  .setLabel('Speak')
					  .setStyle('SUCCESS')
            .setDisabled('true'),
        new MessageButton()
					.setCustomId('start')
					.setLabel('Start')
					.setStyle('DANGER'),
		  );
      const embed = new MessageEmbed()
			.setColor('#f9ffa1')
			.setTitle('Election Stages')
			.setDescription('Brief Description of all election stages')
      .addFields(
      { name: 'Search', value: 'The Searching stage will allow users to run for president. ' },
		  { name: 'Prep', value: 'The Prep stage will send a message in <#941837507287482508> saying that a election is starting soon and providing details of it. ' },
      { name: 'Speak', value: 'This will create a channel for each cantidate in which they get one message to tell people why they should be elected. (Feature is Deprecated for the time being)' },
      { name: 'Start', value: 'This will begin the voting phase of the election.' },
	);
		await interaction.reply({components: [row], embeds: [embed] });

	
	},
};
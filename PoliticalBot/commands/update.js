 const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

let development_stuff_id = '942102274426171402';

const missingEmbed = new MessageEmbed()
  .setColor("#ff6e75")
  .setTitle("Uh oh!")
  .setDescription("You are missing the required role : **PoliticalBotDeveloper**");

const successEmbed = new MessageEmbed()
  .setColor("#99ff7a")
  .setTitle("Sent!")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('send-update')
		.setDescription('Sends update news')
    .addStringOption(option =>
		  option.setName('name')
			  .setDescription('Name of the update')
			  .setRequired(true))
    .addStringOption(option =>
		option.setName('desc')
			.setDescription('The desc of the update')
			.setRequired(true))
    .addStringOption(option =>
		option.setName('date')
			.setDescription('date the update actually releases')
			.setRequired(true))
    .addStringOption(option =>
      option.setName('version')
       .setDescription('version number')
       .setRequired(true)),
	async execute(interaction) {
      if (!interaction.member.roles.cache.some(role => role.name === 'PoliticalBotScripter')) {
      interaction.reply({embeds: [missingEmbed]});
      return;
    }
    const name = interaction.options.getString('name');
    const desc = interaction.options.getString('desc');
    const date = interaction.options.getString('date');
    const version = interaction.options.getString('version')
    const updateEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('New Update')
      .addFields(
    { name: name, value: version  },
		{ name: 'What is it?', value: desc },
    { name: 'Date of release', value: date },
	);

    interaction.client.channels.cache.get(development_stuff_id).send({embeds: [updateEmbed]});
    
    interaction.reply({embeds: [successEmbed]});
    
	},
};
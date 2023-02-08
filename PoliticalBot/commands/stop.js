const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const missingEmbed = new MessageEmbed()
  .setColor("#ff6e75")
  .setTitle("Uh oh!")
  .setDescription("You are missing the required role : **PoliticalBotScripter**");

const stoppingEmbed = new MessageEmbed()
  .setColor("#ffbc5e")
  .setTitle("Stopping!")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('it stops the bot...obviously lol'),
	async execute(interaction) {
      if (!interaction.member.roles.cache.some(role => role.name === 'PoliticalBotScripter')) {
      interaction.reply({embeds: [missingEmbed]});
      return;
    }
    interaction.reply({embeds: [stoppingEmbed]});
    wait(200);
    process.exit(1);
	},
};
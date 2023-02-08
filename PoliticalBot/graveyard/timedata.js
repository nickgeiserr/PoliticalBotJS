const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs')
eval(fs.readFileSync('../Systems/Time/TimedEvent.js')+'');
const { MessageEmbed } = require('discord.js');


let development_stuff_id = '942102274426171402';

const missingEmbed = new MessageEmbed()
  .setColor("#ff6e75")
  .setTitle("Uh oh!")
  .setDescription("You are missing the required role : **PoliticalBotDeveloper**");

const reloadedEmbed = new MessageEmbed()
  .setColor("#34eb7d")
  .setTitle("Reloaded!")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timedata')
		.setDescription('Fetch current time-data')
    .addSubcommand(subcommand =>
		  subcommand
			  .setName('reload')
			  .setDescription('Reloads time data'))
    .addSubcommand(subcommand =>
		  subcommand
			  .setName('get')
			  .setDescription('Gets time data')),
	async execute(interaction) {
      if (!interaction.member.roles.cache.some(role => role.name === 'PoliticalBotScripter')) {
      interaction.reply({embeds: [missingEmbed]});
      return;
    }

    if(interaction.options.getSubcommand() === 'reload'){
      InitializeTimeData();
      interaction.reply({embeds: [reloadedEmbed]})
      return;
    }
    if(interaction.options.getSubcommand() === 'get'){
      const data = fs.readFileSync('./Systems/Time/TimeData.json', 'utf8')
    var jsonObj = JSON.parse(data);
    
    const timedataEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Current Time Data')
      .addFields(
    { name: 'Minutes', value: " "+jsonObj["minutes"]  },
		{ name: 'Half-Hours', value: " "+jsonObj["half_hours"] },
    { name: 'Hours', value: " "+jsonObj["hours"] },
    { name: 'Twelve Hours', value : " "+jsonObj["twelve_hours"] },
    { name: 'Days', value : " "+jsonObj["days"] },
    { name: 'Weeks', value : " "+jsonObj["weeks"] },
    { name: 'Months', value : " "+jsonObj["months"] },
	);
    interaction.reply({embeds: [timedataEmbed]});
    }
	},
};
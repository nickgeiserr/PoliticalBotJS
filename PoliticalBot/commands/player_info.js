const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const fs = require('fs')

const notRegistered = new MessageEmbed ()
    .setColor("#ffbf75")
    .setTitle("Hmmm")
    .setDescription('It seems like this user is not registered yet!')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playerinfo')
		.setDescription('Select a member to view info on')
		.addUserOption(option => option.setName('user').setDescription('The member to view')),
	async execute(interaction) {
		const user = interaction.options.getMentionable('user');
    console.log(user.id)
    if(!fs.existsSync("./Users/" + user.id + ".json")){
        await interaction.reply({embeds: [notRegistered]})
      return;
    }
    const data = fs.readFileSync('./Users/' + user.id + '.json', 'utf8')
    var jsonObj = JSON.parse(data);
    const infoEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Player Info')
      .addFields(
        { name: 'Money', value: " " + jsonObj['money'] },
		    { name: 'Job', value: " " + jsonObj['Job'] },
        { name: 'isJailed', value: " " + jsonObj['isJailed'] },
        { name: 'Times in jail', value: " " + jsonObj['timesInJail'] },
        { name: 'Bugs Reported', value: " " + jsonObj['bugsReported'] },
        { name: 'Company', value: " " + jsonObj['companyName'] },
        { name: 'Is Developer', value: " " + jsonObj['isDeveloper'] },
	);
    interaction.reply({embeds: [infoEmbed]});
      
    
	},
};
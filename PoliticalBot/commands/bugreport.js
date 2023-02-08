const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

var issuesID = "942122225878827078";

// modify func
function IncrementBugsReported(uuid){
  const data = fs.readFileSync('./Data/Users/' + uuid + '.json', 'utf8')
  var jsonObj = JSON.parse(data);
  jsonObj["bugsReported"] = jsonObj["bugsReported"] + 1;
  var json = JSON.stringify(jsonObj, null, 4)
  fs.writeFile('./Data/Users/' + uuid + '.json', json, err => {
  if (err) {
     console.log("uh oh : " + err)
   }
  });
}

// embeds
const embed = new MessageEmbed ()
    .setColor("#94ffbd")
    .setTitle("Success!")
    .setDescription("Issue has been reported");
   

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bug-report')
		.setDescription('Report a issue involving the bot')
		.addStringOption(option => option.setName('bug').setDescription('Describe what Happened').setRequired(true)),
	async execute(interaction) {
		const value = interaction.options.getString('bug');
    const bugReport = new MessageEmbed ()
    .setColor("#ff6e75")
    .setTitle("Bug Report")
    .setDescription(value)
    .setFooter({ text: "Sent By : <@" + interaction.member.user.id + ">"});
    interaction.client.channels.cache.get(issuesID).send({embeds: [bugReport]});
    interaction.reply({embeds: [embed]});
    IncrementBugsReported(interaction.member.user.id)
	},
};
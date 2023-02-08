const { Client, Collection, Intents, GuildMember, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs')
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const guild = client.guilds.cache.get("941142394085199952");

const failEmbed = new MessageEmbed ()
    .setColor("#ff6e75")
    .setTitle("Uh Oh!")
    .setDescription("Something went wrong! Try again or contact a developer!");
const alreadyReg = new MessageEmbed ()
    .setColor("#ffbf75")
    .setTitle("Hmmm")
    .setDescription("It appears that you have already registered." +"** If this is a mistake please contact a developer **");
const embed = new MessageEmbed ()
    .setColor("#94ffbd")
    .setTitle("Success!")
    .setDescription("You are now registered!");    


module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Registers Character. Must be done before doing any other actions'),
	async execute(interaction) {
		var uuid = interaction.member.user.id
    let path = "./Users/" + uuid + ".json";
    if (fs.existsSync(path)) {
      interaction.reply({embeds: [alreadyReg]})
      } else {
      var data = {
        "userID":interaction.member.user.id,
        "money":100,
        "Job":"None",
        "Vote":"None",
        "hasVoted":"false",
        "isJailed":"false",
        "timesInJail":0,
        "bugsReported":0,
        "employer":"None",
        "paycheck":0,
        "isOwner":false,
        "isDeveloper":false
      }
      var json = JSON.stringify(data, null, 4);
    fs.writeFile('./Users/' + uuid + '.json', json, err => {
    if (err) {
        interaction.reply({embeds: [failEmbed]})
    }
    interaction.reply({embeds: [embed]})
    interaction.member.roles.add(interaction.guild.roles.cache.find(r => r.id === "941711066537291796"))
    interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.id ===   "941712380654678026"))
     
})
}

    }
	};
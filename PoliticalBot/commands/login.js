const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

const successEmbed = new MessageEmbed()
  .setColor("#da82ff")
  .setTitle("Success!")
  .setDescription("You are now logged in. Welcome back!");
const failEmbed = new MessageEmbed ()
    .setColor("#ff6e75")
    .setTitle("Uh Oh!")
    .setDescription("Something went wrong! Try again or report it with /bug-report!");
const notRegistered = new MessageEmbed ()
    .setColor("#ffbf75")
    .setTitle("Hmmm")
    .setDescription("It appears as though you aren't registered yet. If this is incorrect, **Please contact a developer**")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('login')
		.setDescription('For those who may have left the server or been kicked'),
	async execute(interaction) {
		const uuid = interaction.member.user.id;
    let path = "./Users/" + uuid + ".json";
    if (fs.existsSync(path)) {
      interaction.reply({embeds: [successEmbed]})
      interaction.member.roles.add(interaction.guild.roles.cache.find(r => r.id === "941711066537291796"))
      interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.id ===   "941712380654678026"))
      return;
      } else {
        interaction.reply({embeds: [notRegistered]});
        return;
      } interaction.reply({embeds: [failEmbed]});
	},
};
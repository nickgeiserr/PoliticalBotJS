const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

const failEmbed = new MessageEmbed ()
    .setColor("#ff6e75")
    .setTitle("Uh Oh!")
    .setDescription("Something went wrong! Try again or report it with /bug-report!");
const successEmbed = new MessageEmbed ()
    .setColor("#94ffbd")
    .setTitle("Success!")
    .setDescription("Your Business has been created!");   
const alreadyEmbed = new MessageEmbed ()
    .setColor("#ffbf75")
    .setTitle("Hmmm")
    .setDescription("It appears as though you already own a company and at the moment only one company per person is supported! **If you do NOT own a company, please DM a developer.**");
const itAlreadyExists = new MessageEmbed()
    .setColor('#5c9973')
    .setTitle('Already Exists')
    .setDescription('A company with this name already exists! You have not been charged.')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('company')
		.setDescription('Starting Command for actions involving companies')
    .addSubcommand(subcommand =>
		  subcommand
			  .setName('create')
			  .setDescription('Create a Company')
        .addStringOption(option =>
		      option.setName('name')
			    .setDescription('Name of the company. This cannot be changed.')
			    .setRequired(true))),
	async execute(interaction) {
		const playerID = interaction.member.user.id;
    if (interaction.options.getSubcommand() === 'create') {
          const name = interaction.options.get("name").value
          let response = CreateCompany(name, playerID);
          if(response == true) {
            interaction.reply({embeds: [successEmbed]});
            return;
          }
          if(response == 'isOwner') {
            interaction.reply({embeds: [alreadyEmbed]}); 
            return;
          }
          if(response == "alreadyExists"){
            interaction.reply({embeds: [itAlreadyExists]})
            return;
          }
          if(response == "lackingFunds"){
            const data = fs.readFileSync('./Users/' + playerID + '.json', 'utf8')
            var jsonObj = JSON.parse(data);
            var neededCash = 1000 - jsonObj["money"]
            let neededMessage = "You need **" + neededCash + "** more dollars to create a company."
            const lackingFunds = new MessageEmbed()
              .setColor('#b06b4f')
              .setTitle("Insufficent Funds")
              .setDescription(neededMessage)
            interaction.reply({embeds: [lackingFunds]})
          }
          else {
            interaction.reply({embeds: [failEmbed]});
            return;
          }
        
    }
      
	},
};
function CreateCompany(name, ownerID){
  const data = fs.readFileSync('./Users/' + ownerID + '.json', 'utf8')
  var jsonObj = JSON.parse(data);
  if(jsonObj["isOwner"] == true){
    return 'isOwner';
  }
  if(jsonObj["money"] > 1000) {
      var jsonData = {
        "ownerID":ownerID,
        "name":name,
        "employees":["None"],
        "products":["None"],
        "funds":0
      }
  if (fs.existsSync("./Economy/companies/current/" + name + ".json")) {
    return "alreadyExists";
  }
  jsonObj["money"] -= 1000;
  var newUser = JSON.stringify(jsonObj, null, 4)
  fs.writeFile('./Users/' + ownerID + '.json', newUser, err => {
    if (err) {
        console.log(err);
        return false;
    }
  });
  var json = JSON.stringify(jsonData, null, 4);
  fs.writeFile('./Economy/companies/current/' + name + ".json", json, err => {
    if (err) {
        console.log(err);
        return false;
    }
  })
  return true;
  
  } else {
    return "lackingFunds"
  }

}
const fs = require('fs');
eval(fs.readFileSync('./PoliticalBot/Systems/Time/TimedEvent.js')+'');
eval(fs.readFileSync('./PoliticalBot/Systems/JSON/JsonEdit.js')+'');

var cron = require('node-cron');

const { Client, Collection, MessageEmbed, GatewayIntentBits } = require('discord.js');

const { token } = require('./Configuration/bot_config.json');

const wait = require('util').promisify(setTimeout);

const discordClient = new Client({ intents:[GatewayIntentBits.Guilds] });

const { bug_testing_id, voting_id } = require("./Configuration/server_config.json");


// send message in channel
function sendTimedMessageInChannel(channelID, message, time){
  discordClient.channels.cache.get(channelID).send(message).then(msg => setTimeout(() => msg.delete(), time));
}

// send embed in channel
function sendEmbedInChannel(channelID, embed){
  discordClient.channels.cache.get(channelID).send({embeds: [embed]});
}

// EventListener for Timed events
cron.schedule('* * * * *', () => {
  IncrementMinutes();
});

discordClient.commands = new Collection();
const commandFiles = fs.readdirSync('./PoliticalBot/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./PoliticalBot/commands/${file}`);
//  console.log(command);
	discordClient.commands.set(command.data.name, command);
}

discordClient.once('ready', () => {
	console.log("\x1b[31m%s\x1b[0m", 'PoliticalBot Loaded.');
  
  // starts event listener
  InitializeTimeData();
});

discordClient.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = discordClient.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

discordClient.on('guildMemberAdd', (guildMember) => {
   guildMember.addRole(guildMember.guild.roles.find(role => role.name === "Unregistered Citizen"));
});

// select menu handler
discordClient.on('interactionCreate', async interaction => {
if(interaction.isSelectMenu()){
  let choice = interaction.values[0] 
    const member = interaction.member
     if(choice == 'basic_info_option'){
      await interaction.deferUpdate();
		  await wait(0);
      await interaction.editReply({embeds: [basic_info_embed]})}
     if(choice == 'goverment_option'){
       await interaction.deferUpdate();
       await wait(0);
       await interaction.editReply({embeds: [goverment_info_embed]});
     }
     }
if(interaction.isButton){
  const customId = interaction.customId;
  if(customId === "search"){
  }
  if(customId === "prep"){
    await interaction.message.delete();
    let msg = '<@&' + '941711066537291796' + '>'
    sendEmbedInChannel(voting_id, prep_embed)
    sendEmbedInChannel(voting_id, election_info_embed)
    sendTimedMessageInChannel(voting_id, msg , 1000);
  }
  if(customId === "speak"){
    
  }
  if(customId === "start"){
    await interaction.message.delete();
    
  }
}})

let success = discordClient.login(token)
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('will')
		.setDescription('Te dice el color de piel de will.'),
	async execute(interaction) {
		await interaction.reply('Esto ha de ser una broma, obviamente Will es negro. :skull:');
	},
};
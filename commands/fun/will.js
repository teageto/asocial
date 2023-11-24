const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('will')
		.setDescription('Te dice el color de piel de will.'),
	category: 'fun',
	async execute(interaction) {
		await interaction.reply('Esto ha de ser una broma, obviamente Will es negro. <:a_skulldead:1125470448449232996>');
	},
};
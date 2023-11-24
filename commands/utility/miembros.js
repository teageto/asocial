const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('miembros')
		.setDescription('Muestra el numero de miembros que tiene el server.'),
	async execute(interaction) {
		await interaction.reply(`${interaction.guild.name} tiene ${interaction.guild.memberCount} miembros.`);
	},
};
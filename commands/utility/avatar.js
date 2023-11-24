const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Muestra el avatar del usuario.')
		.addUserOption(option =>
			option
				.setName('usuario')
				.setDescription('Usuario del que quieres mostrar la foto.')
				.setRequired(true)),
	category: 'utility',
	async execute(interaction) {
		const usuario = interaction.options.getUser('usuario');
		if (usuario) return interaction.reply(`${usuario.username} avatar: ${usuario.displayAvatarURL()}`);
	},
};
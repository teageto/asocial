const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ojito con este que asesina.')
		.addUserOption(option =>
			option.setName('objetivo')
				.setDescription('La persona que queres matar')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
	category: 'moderation',
	async execute(interaction) {
		const target = interaction.option.getUser('objetivo');

		await interaction.reply(`Te fuiste baneado por pt ${target.username}.`);
		await interaction.guild.members.ban(target);
	},
};
const { joinVoiceChannel } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play a song'),
	async execute(interaction) {
		const channel = interaction.member.voice.channel;

		if (!channel) {
			return interaction.reply('¡Debes estar en un canal de voz para usar este comando!');
		}

		try {
			const connection = joinVoiceChannel({
				channelId: channel.id,
				guildId: channel.guild.id,
				adapterCreator: channel.guild.voiceAdapterCreator,
			});

			if (connection) {
				interaction.reply('¡Conectado al canal de voz!');
			}
		} 
		catch (error) {
			console.error(error);
			interaction.reply('¡Ocurrió un error al unirse al canal de voz!');
		}
	},
};

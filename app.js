const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, CommandInteraction, REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);


for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for( const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
    if('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}
};

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Recargando ${client.commands.length} aplicacion (/) comandos.`);
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId),
            { body: client.commands },
        );
        console.log(`Se recargo y quedaron re pillos los ${client.commands.length} aplicacion (/) comandos.`)
    } catch (error) {
        console.error(error);
    };
})();

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command){
        console.error(`No hay ningun commando que coincida ${interaction.commandName} fue encontrado.`)
        return;
    }

    try {
        await command.execute(interaction);
    } catch(error) {
        console.log(error);
        if(interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
    }
    console.log(interaction);
});

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag  }!`);
    
});

client.login(token);


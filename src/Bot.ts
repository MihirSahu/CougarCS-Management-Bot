const { Client, ClientOptions, REST, SlashCommandBuilder, Routes, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
import * as dotenv from 'dotenv';
import ready from './Ready';
import { commands } from './Commands';
import { getEventsInfo, getMeetingsInfo, getTodoInfo, getMarketingInfo, formatInfo } from './Util';
import { table } from 'table';


dotenv.config();

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;


const client = new Client({
    intents: []
});

ready(client);
client.login(token);

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data: any) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);

const table_config = {
    singleLine: true,
};

client.on('interactionCreate', async (interaction: any) => {
	if (!interaction.isChatInputCommand()) return;

        const { commandName } = interaction;
        let res: any;
        switch(commandName){
            case 'hello':
                await interaction.reply("Hello, world!");
                break;
            case 'geteventsinfo':
                await interaction.deferReply();
                res = await getEventsInfo();
                await interaction.editReply(res?.[0]?.[0]);
                break;
            case 'getmeetingsinfo':
                await interaction.deferReply();
                res = await getMeetingsInfo();
                await interaction.editReply(res?.[0]?.[0]);
                break;
            case 'gettodoinfo':
                await interaction.deferReply();
                res = await getTodoInfo();
                await interaction.editReply(table(formatInfo((await getTodoInfo()).slice(0, 4))), table_config);
                break;
            case 'getmarketinginfo':
                await interaction.deferReply();
                res = await getMarketingInfo();
                await interaction.editReply(res?.[0]?.[0]);
                break;
        }
});
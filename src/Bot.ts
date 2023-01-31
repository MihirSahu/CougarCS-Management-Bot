const { Client, ClientOptions, REST, SlashCommandBuilder, Routes, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
import * as dotenv from 'dotenv';
import ready from './Ready';
import { commands } from './Commands';
import { sheetsList, getSheetsInfo, formatInfo, sendMessage } from './Util';


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

client.on('interactionCreate', async (interaction: any) => {
	if (!interaction.isChatInputCommand()) return;

        const { commandName } = interaction;
        let res: string[][];
        switch(commandName){
            case 'hello':
                await interaction.reply("Hello, world!");
                break;
            case 'geteventsinfo':
                await interaction.deferReply();
                res = await getSheetsInfo(sheetsList[0]);
                await sendMessage(interaction, res);
                break;
            case 'getmeetingsinfo':
                await interaction.deferReply();
                res = await getSheetsInfo(sheetsList[1]);
                await sendMessage(interaction, res);
                break;
            case 'gettodoinfo':
                await interaction.deferReply();
                res = await getSheetsInfo(sheetsList[2]);
                await sendMessage(interaction, res);
                break;
            case 'getmarketinginfo':
                await interaction.deferReply();
                res = await getSheetsInfo(sheetsList[3]);
                await sendMessage(interaction, res);
                break;
        }
});
import { SlashCommandBuilder } from 'discord.js';

export const commands = [
	// Slash command names must be in lowercase
    new SlashCommandBuilder()
    	.setName('hello')
    	.setDescription('Greets the user')
    	.addStringOption(option =>
    		option.setName('name')
    			.setDescription('The name of the user')
    			.setRequired(true)),
	new SlashCommandBuilder()
		.setName('geteventsinfo')
		.setDescription("Fetches events updates"),
	new SlashCommandBuilder()
		.setName('getmeetingsinfo')
		.setDescription("Fetches meetings updates"),
	new SlashCommandBuilder()
		.setName('gettodoinfo')
		.setDescription("Fetches todo updates"),
	new SlashCommandBuilder()
		.setName('getmarketinginfo')
		.setDescription("Fetches marketing updates"),
];
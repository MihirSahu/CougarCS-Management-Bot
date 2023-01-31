import {google} from 'googleapis';
import { table } from 'table';


const googleApiAuth = process.env.GOOGLE_API_KEY
const googleSpreadsheetID = process.env.GOOGLE_SPREADSHEET_ID

const sheets = google.sheets({
    version: 'v4',
    auth: googleApiAuth,
});

// List of sheets in the planner
export const sheetsList = ['Events 📍', 'Meetings 📆', 'Todo 📋', 'Marketing 📷'];

// Get info from planner
export const getSheetsInfo = async (sheetName: string): Promise<string[][]> => {
    const params = {
        spreadsheetId: googleSpreadsheetID,
        range: sheetName,
        valueRenderOption: 'FORMATTED_VALUE',
        dateTimeRenderOption: 'FORMATTED_STRING',
        majorDimension: 'ROWS',
    };

    const res: any = await sheets.spreadsheets.values.get(params);
    return res?.data.values;
}

// Format info for the table function in Bot.ts
export const formatInfo = (info: any): string[][] => {
    let numElements = info?.[0].length;

    for (let row of info) {
        if (row.length < numElements) {
            let diff = numElements - row.length;
            for (let i = 0; i < diff; i++) {
                row.push('');
            }
        }
    }

    return info;
}

// Handle interaction and send formatted message
export const sendMessage = async (interaction: any, res: string[][]) => {
    
    const table_config = {
        singleLine: true,
    };

    await interaction.editReply(table(formatInfo(res.slice(0, 4))), table_config);
}
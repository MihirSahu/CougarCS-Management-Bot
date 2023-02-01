import {google} from 'googleapis';
import { table } from 'table';
import { SheetEvent, SheetMeeting, SheetTodo, SheetMarketing } from './Types';


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

// Parse info into types
export const parseTodo = (info: string[][]): SheetTodo[] => {

    let Todo: SheetTodo[] = [];

    for (let row = 1; row < info.length; row++) {
        Todo.push({
            deadline: new Date,
            status: info[row][1],
            name: info[row][2],
            asignees: info[row][3],
            description: info[row][4]
        });
    }

    return Todo;
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

// TODO: Fix this
// Handle interaction and send formatted message
/*
export const sendMessage = async (interaction: any, res: SheetEvent | SheetMeeting | SheetTodo | SheetMarketing) => {
    
    const table_config = {
        singleLine: true,
    };

    await interaction.editReply(table(formatInfo(res.slice(0, 4))), table_config);
}
*/
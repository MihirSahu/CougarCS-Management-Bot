import {google} from 'googleapis';

const googleApiAuth = process.env.GOOGLE_API_KEY
const googleSpreadsheetID = process.env.GOOGLE_SPREADSHEET_ID

// Get info from planner

export const getEventsInfo = async () => {
    const sheets = google.sheets({
        version: 'v4',
        auth: googleApiAuth,
    });
    
    const params = {
        spreadsheetId: googleSpreadsheetID,
        range: 'Events 📍',
        valueRenderOption: 'FORMATTED_VALUE',
        dateTimeRenderOption: 'FORMATTED_STRING',
        majorDimension: 'ROWS',
    };
    const res = await sheets.spreadsheets.values.get(params);
    return res.data.values;
}

export const getMeetingsInfo = async () => {
    const sheets = google.sheets({
        version: 'v4',
        auth: googleApiAuth,
    });
    
    const params = {
        spreadsheetId: googleSpreadsheetID,
        range: 'Meetings 📆',
        valueRenderOption: 'FORMATTED_VALUE',
        dateTimeRenderOption: 'FORMATTED_STRING',
        majorDimension: 'ROWS',
    };
    const res = await sheets.spreadsheets.values.get(params);
    return res.data.values;
}

export const getTodoInfo = async (): Promise<string[][]> => {
    const sheets = google.sheets({
        version: 'v4',
        auth: googleApiAuth,
    });
    
    const params = {
        spreadsheetId: googleSpreadsheetID,
        range: 'Todo 📋',
        valueRenderOption: 'FORMATTED_VALUE',
        dateTimeRenderOption: 'FORMATTED_STRING',
        majorDimension: 'ROWS',
    };
    const res: any = await sheets.spreadsheets.values.get(params);
    return res?.data.values;
}

export const getMarketingInfo = async () => {
    const sheets = google.sheets({
        version: 'v4',
        auth: googleApiAuth,
    });
    
    const params = {
        spreadsheetId: googleSpreadsheetID,
        range: 'Marketing 📷',
        valueRenderOption: 'FORMATTED_VALUE',
        dateTimeRenderOption: 'FORMATTED_STRING',
        majorDimension: 'ROWS',
    };
    const res = await sheets.spreadsheets.values.get(params);
    return res.data.values;
}


// Format info for the table function in Bot.ts
export const formatInfo = (info: any) => {
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
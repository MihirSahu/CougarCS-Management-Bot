import { google } from "googleapis";


const sheets = google.sheets({
    version: 'v4',
    auth: ''
});

const params = {
    sheetId: '1UMOMWkzmVfzKH_o_ZNxNf_SjMXPDa90-4joxV2shq4g'
}

async runSample = () => {
    const res = await sheets.spreadsheets.get(params, (err, res) => {
        if (err) {
            console.error(err);
            throw err
        }
        console.log(`The sheet url is ${res.data.url}`)
    })
}

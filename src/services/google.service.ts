import { google } from "googleapis"

export async function updateGoogleSheets() {

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: (process.env.GOOGLE_PRIVATE_KEY || "")
        .replace(/\\n/g, "\n")
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  })

  const sheets = google.sheets({
    version: "v4",
    auth: auth
  })

  const today = new Date().toISOString().slice(0,10)

  const db = require("../db/knex").db

  const tariffs = await db("tariffs")
    .where("date", today)
    .orderBy("box_delivery_coef", "asc")

  const values = tariffs.map((t:any) => [
    t.warehouse_name,
    t.box_delivery_coef,
    t.box_delivery_base,
    t.box_delivery_liter
  ])

  const sheetIds = (process.env.GOOGLE_SHEETS_IDS || "").split(",")

  for (const sheetId of sheetIds) {

    if (!sheetId) continue

    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: "stocks_coefs!A2",
      valueInputOption: "RAW",
      requestBody: { values }
    })

  }
}
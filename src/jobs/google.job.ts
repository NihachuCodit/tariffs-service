import cron from "node-cron"
import { updateGoogleSheets } from "../services/google.service"

export function startGoogleJob() {

  cron.schedule("*/10 * * * *", async () => {
    try {
      console.log("Updating Google Sheets")
      await updateGoogleSheets()
    } catch (err) {
      console.error(err)
    }
  })

}
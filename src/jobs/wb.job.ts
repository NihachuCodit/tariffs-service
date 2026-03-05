import cron from "node-cron"
import { fetchTariffs } from "../services/wb.service"
import { saveTariffs } from "../services/tariff.service"

export function startWBJob() {

  cron.schedule("0 * * * *", async () => {

    console.log("Fetching WB tariffs")

    const tariffs = await fetchTariffs()

    await saveTariffs(tariffs)

  })

}
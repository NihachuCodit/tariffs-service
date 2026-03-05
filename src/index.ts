import { startWBJob } from "./jobs/wb.job"
import { startGoogleJob } from "./jobs/google.job"

async function start() {

  console.log("Service started")

  startWBJob()
  startGoogleJob()

}

start()
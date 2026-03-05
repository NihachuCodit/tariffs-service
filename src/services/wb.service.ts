import axios from "axios"

export async function fetchTariffs() {

  const today = new Date().toISOString().slice(0,10)

  const response = await axios.get(
    "https://common-api.wildberries.ru/api/v1/tariffs/box",
    {
      params: {
        date: today
      },
      headers: {
        Authorization: process.env.WB_API_TOKEN
      }
    }
  )

  return response.data.response.data.warehouseList
}
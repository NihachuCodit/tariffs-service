import { db } from "../db/knex"

export async function saveTariffs(tariffs: any[]) {

  const today = new Date().toISOString().slice(0,10)

  for (const tariff of tariffs) {

    await db("tariffs")
      .insert({
        date: today,
        warehouse_name: tariff.warehouseName,
        box_delivery_coef: tariff.boxDeliveryCoefExpr,
        box_delivery_base: tariff.boxDeliveryBase,
        box_delivery_liter: tariff.boxDeliveryLiter
      })
      .onConflict(["date","warehouse_name"])
      .merge()

  }

}
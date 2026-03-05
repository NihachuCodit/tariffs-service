exports.up = async function (knex) {

  await knex.schema.createTable("tariffs", table => {

    table.increments("id")

    table.date("date").notNullable()

    table.string("warehouse_name").notNullable()

    table.float("box_delivery_coef")
    table.float("box_delivery_base")
    table.float("box_delivery_liter")

    table.unique(["date","warehouse_name"])

  })

}

exports.down = async function (knex) {

  await knex.schema.dropTable("tariffs")

}
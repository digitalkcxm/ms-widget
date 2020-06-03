exports.up = knex => knex.schema.createTable('widget', table => {
  table.increments()
  table.integer('id_company').notNullable().unsigned()
  table.string('name').notNullable()
  table.json('theme').notNullable()
  table.string('token').notNullable()
  table.boolean('active').defaultTo(true)
  table.timestamps(true, true)
  table.unique('name')
  table.unique('token')
  table.foreign('id_company').references('widget.id')
})

exports.down = knex => knex.schema.dropTableIfExists('widget')

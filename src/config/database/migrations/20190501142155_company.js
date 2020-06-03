exports.up = knex => knex.schema.createTable('company', table => {
  table.increments()
  table.string('name').notNullable()
  table.string('callback').notNullable()
  table.string('token').notNullable()
  table.boolean('active').defaultTo(true)
  table.timestamps(true, true)
  table.unique('name')
  table.unique('token')
})

exports.down = knex => knex.schema.dropTableIfExists('company')

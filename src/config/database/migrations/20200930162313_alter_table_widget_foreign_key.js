
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('widget', table => {
        table.dropForeign('id_company')
        table.foreign('id_company').references('company.id')
    })
};

exports.down = function(knex, Promise) {
  
};

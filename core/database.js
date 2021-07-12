const pgp = require('pg-promise')({});
pgp.pg.types.setTypeParser(1700, (value) => {
	return parseFloat(value);
});
pgp.pg.defaults.poolSize = 5;

const db = pgp({
	database: 'tria',
	user: 'postgres',
	password: 'postgres',
	host: 'localhost',
	port: 5432,
	max: 10,
	idleTimeoutMillis: 30000
});
const { as, helpers } = pgp;

module.exports = { ...db, as, helpers };

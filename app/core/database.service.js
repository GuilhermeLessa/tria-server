const pgp = require('pg-promise')({});
pgp.pg.types.setTypeParser(1700, (value) => {
	return parseFloat(value);
});
pgp.pg.defaults.poolSize = 5;

const db = pgp({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
	max: 10,
	idleTimeoutMillis: 30000
});
const { as, helpers } = pgp;

module.exports = { ...db, as, helpers };

const database = require('../../core/database');

module.exports = {
    getAll: () => database.manyOrNone(`
        SELECT c.id, c.company, c.name, c.phone, c.email, 
               e.id expense_id, e.value, e.date, e.client_id
        FROM clients c
        LEFT JOIN expenses e ON e.client_id = c.id
        ORDER BY c.id, e.date
    `),
    getOne: (clientId) => database.oneOrNone(`
        SELECT id, company, name, phone, email 
        FROM clients WHERE id = $1
    `, clientId),
    getMonthlyExpense: async (clientId, fullYear, month) => {
        const monthlyExpense = await database.one(`
            SELECT ROUND(
                (
                    SUM(value) /
                    DATE_PART(
                        'days', 
                        DATE_TRUNC('month', MAKE_DATE($2, $3, 1)) 
                        + '1 MONTH':: INTERVAL 
                        - '1 DAY':: INTERVAL
                    )
                ) :: NUMERIC, 
                2
            ) AS daily_average
            FROM expenses
            WHERE client_id = $1 
            AND DATE_PART('year', DATE) = $2 
            AND DATE_PART('month', DATE) = $3
        `, [clientId, fullYear, month]);
        return { fullYear, month, dailyAverage: monthlyExpense.daily_average };
    },
    getExpenses: (clientId, startDate, endDate) => {
        let queryParams = [clientId];
        let dateBetween = '';
        if (startDate || endDate) {
            if (startDate && endDate) {
                queryParams = queryParams.concat([startDate, endDate]);
                dateBetween = 'AND date BETWEEN $2 AND $3';
            } else if (startDate) {
                queryParams.push(startDate);
                dateBetween = 'AND date >= $2';
            } else {
                queryParams.push(endDate);
                dateBetween = 'AND date <= $2';
            }
        }
        return database.manyOrNone(`
            SELECT id, value, date
            FROM expenses
            WHERE client_id = $1
            ${dateBetween}
            ORDER BY date
        `, queryParams)
    },
    insert: async (client) => (await database.one(`
        INSERT INTO clients (\${this:name}) 
        VALUES (\${this:csv}) 
        RETURNING id
    `, client)).id,
    update: (client) => {
        let _client = { ...client };
        delete _client.id;

        const tableName = 'clients';
        const updateKeys = Object.keys(_client);
        const where = database.as.format(' WHERE id = $1', client.id);
        const returning = ' RETURNING id, company, name, phone, email';
        const query = database.helpers.update(client, updateKeys, tableName) + where + returning;

        return database.one(query);
    },
    delete: async (clientId) => {
        const result = await database.oneOrNone(`
            DELETE FROM clients 
            WHERE id = $1 
            RETURNING true AS success
        `, clientId);
        return result ? result.success : false;
    }
};
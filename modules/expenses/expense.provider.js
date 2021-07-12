const database = require('../../core/database');

module.exports = {
    insert: async (expense) => {
        const _expense = { ...expense, client_id: expense.clientId };
        delete _expense.clientId;

        return (await database.one(`
            INSERT INTO expenses (\${this:name}) 
            VALUES(\${this:csv}) 
            RETURNING id
        `, _expense)).id;
    },
    
    update: async (expense) => {
        let _expense = { ...expense };
        delete _expense.id;

        const tableName = 'expenses';
        const updateKeys = Object.keys(_expense);
        const where = database.as.format(' WHERE id = $1', expense.id);
        const returning = ' RETURNING id, value, date, client_id';
        const query = database.helpers.update(expense, updateKeys, tableName) + where + returning;

        _expense = await database.one(query);
        _expense.clientId = _expense.client_id;
        delete _expense.client_id;
        return _expense;
    },
    
    delete: async (expenseId) => {
        const result = await database.oneOrNone(`
            DELETE FROM expenses 
            WHERE id = $1 
            RETURNING true AS success
        `, expenseId);
        return result ? result.success : false;
    }
};

const databaseService = require('../../core/database.service');

module.exports = {
    insert: async (expense) => {
        const _expense = { ...expense, client_id: expense.clientId };
        delete _expense.clientId;

        return (await databaseService.one(`
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
        const where = databaseService.as.format(' WHERE id = $1', expense.id);
        const returning = ' RETURNING id, value, date, client_id';
        const query = databaseService.helpers.update(expense, updateKeys, tableName) + where + returning;

        _expense = await databaseService.one(query);
        _expense.clientId = _expense.client_id;
        delete _expense.client_id;
        return _expense;
    },

    delete: async (expenseId) => {
        const result = await databaseService.oneOrNone(`
            DELETE FROM expenses 
            WHERE id = $1 
            RETURNING true AS success
        `, expenseId);
        return result ? result.success : false;
    }
};

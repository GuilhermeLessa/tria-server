const expenseSchema = require('./expense.schema');
const expenseResolver = require('./expense.resolver');
const expenseDataProvider = require('./expense.provider');

const expenseService = {
    insert: async (expense) => {
        const id = await expenseDataProvider.insert(expense);
        return { id, ...expense };
    },
    update: (expense) => expenseDataProvider.update(expense),
    delete: (expenseId) => expenseDataProvider.delete(expenseId),
};

module.exports = {
    schema: expenseSchema,
    resolver: expenseResolver,
    service: expenseService
};
const infographHelper = require('../../core/infograph.helper');
const dateHelper = require('../../core/date.helper');

module.exports = (expenseService) => ({
    mutations: () => ({
        insertExpense: (_, args) => expenseService.insert(args.expense),
        updateExpense: async (_, args) => {
            const expense = await expenseService.update(args.expense);
            expense.date = dateHelper.toString(expense.date);
            return expense;
        },
        deleteExpense: (_, args) => expenseService.delete(args.id)
    })
});
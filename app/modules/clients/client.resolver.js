const infographHelper = require('../../core/infograph.helper');
const dateHelper = require('../../core/date.helper');

module.exports = (clientService) => ({
    querys: () => ({
        getAllClients: () => clientService.getAll(),
        getClient: (_, args, context, info) => {
            const monthlyExpenseInfo = infographHelper(info).getField('monthlyExpense');
            const monthlyExpense = monthlyExpenseInfo.isDefined
                ? monthlyExpenseInfo.args
                : null;

            const expensesInfo = infographHelper(info).getField('expenses');
            const expenses = expensesInfo.isDefined
                ? {
                    hasSum: infographHelper(expensesInfo).getField('sum').isDefined,
                    hasItems: infographHelper(expensesInfo).getField('items').isDefined,
                    startDate: expensesInfo.args.startDate ? dateHelper.toDate(expensesInfo.args.startDate) : null,
                    endDate: expensesInfo.args.endDate ? dateHelper.toDate(expensesInfo.args.endDate) : null,
                }
                : null;

            return clientService.getClient(
                args.id,
                monthlyExpense,
                expenses
            )
        }
    }),
    mutations: () => ({
        insertClient: (_, args) => clientService.insert(args.client),
        updateClient: (_, args) => clientService.update(args.client),
        deleteClient: (_, args) => clientService.delete(args.id)
    })
});
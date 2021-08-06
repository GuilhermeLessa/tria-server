
const dateHelper = require('../../core/helpers/date.helper');

const clientSchema = require('./client.schema');
const clientResolver = require('./client.resolver');
const clientDataProvider = require('./client.provider');

const clientService = {
    getAll: async () => {
        const clients = await clientDataProvider.getAll();

        const _response = [];
        clients.forEach(client => {
            if (_response.find(_client => _client.id == client.id)) return;

            const expenseItems = clients
                .filter(expense => expense.client_id == client.id)
                .map(expense => ({
                    id: expense.expense_id,
                    value: expense.value,
                    date: dateHelper.toString(expense.date)
                }));

            const { id, company, name, phone, email } = client;
            _response.push({ id, company, name, phone, email, expenses: { items: expenseItems } });
        });

        return _response;
    },
    
    getClient: async (clientId, monthlyExpense, expenses) => {
        const client = await clientDataProvider.getOne(clientId);
        const _response = { ...client };

        if (monthlyExpense) {
            const _monthlyExpense = await clientDataProvider.getMonthlyExpense(
                clientId,
                monthlyExpense.fullYear,
                monthlyExpense.month
            );
            _response.monthlyExpense = _monthlyExpense;
        }

        if (expenses) {
            const expenseItems = (await clientDataProvider.getExpenses(clientId, expenses.startDate, expenses.endDate))
                .map(expenseItem => ({ ...expenseItem, date: dateHelper.toString(expenseItem.date) }));

            if (expenses.hasSum) {
                const sum = expenseItems
                    .map(expense => expense.value)
                    .reduce((acc, curr) => acc + curr, 0);
                _response.expenses = { sum };
            }

            if (expenses.hasItems) {
                _response.expenses = { ..._response.expenses, items: expenseItems };
            }
        }

        return _response;
    },
    
    insert: async (client) => {
        const id = await clientDataProvider.insert(client);
        return { id, ...client };
    },
    
    update: (client) => clientDataProvider.update(client),
    
    delete: (clientId) => clientDataProvider.delete(clientId),
};

module.exports = {
    schema: clientSchema,
    resolver: clientResolver,
    service: clientService
};

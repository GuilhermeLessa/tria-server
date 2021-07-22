module.exports = {
    mutations: `
        insertExpense(expense: ExpenseInsertInput): ExpenseSavedOutput
        updateExpense(expense: ExpenseUpdateInput): ExpenseSavedOutput
        deleteExpense(id: Int!): Boolean
    `,
    types: `
        type ExpenseFullOutput {
            sum: Float,
            items: [ExpenseItemOutput]
        }

        type ExpenseMinOutput {
            items: [ExpenseItemOutput]
        }

        type ExpenseItemOutput {
            id: Int,
            value: Float,
            date: String
        }

        type ExpenseMonthOutput {
            fullYear: Int!,
            month: Int!,
            dailyAverage: Float!
        }

        input ExpenseInsertInput {
            value: Float!,
            date: String!,
            clientId: Int!
        }

        input ExpenseUpdateInput {
            id: Int!,
            value: Float,
            date: String
        }

        type ExpenseSavedOutput {
            id: Int!,
            value: Float!,
            date: String!,
            clientId: Int!
        }
    `
};
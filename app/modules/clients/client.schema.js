module.exports = {
    querys: `
        getAllClients: [ClientMinOutput]
        getClient(id: Int!): ClientFullOutput
    `,
    mutations: `
        insertClient(client: ClientInsertInput): ClientSavedOutput
        updateClient(client: ClientUpdateInput): ClientSavedOutput
        deleteClient(id: Int!): Boolean
    `,
    types: `
        type ClientFullOutput {
            id: Int,
            company: String,
            name: String,
            phone: String,
            email: String,
            monthlyExpense(fullYear: Int!, month: Int!): ExpenseMonthOutput,
            expenses(startDate: String, endDate: String): ExpenseFullOutput
        }

        type ClientMinOutput {
            id: Int,
            company: String,
            name: String,
            phone: String,
            email: String,
            expenses: ExpenseMinOutput
        }

        input ClientInsertInput {
            company: String!,
            name: String!,
            phone: String!,
            email: String!
        }

        input ClientUpdateInput {
            id: Int!,
            company: String,
            name: String,
            phone: String,
            email: String
        }

        type ClientSavedOutput {
            id: Int!,
            company: String!,
            name: String!,
            phone: String!,
            email: String!
        }

    `
};

const { ApolloServer } = require('apollo-server');
const serverHelper = require('./core/server.helper');

const clientService = require('./modules/clients/client.service');
const expenseService = require('./modules/expenses/expense.service');

const server = new ApolloServer(
	serverHelper.services([
		clientService,
		expenseService
	]).config
);
server.listen();

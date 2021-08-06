const { ApolloServer } = require('apollo-server');
const ServerService = require('./core/server.service');
const logHelper = require('./core/helpers/log.helper');
const infographHelper = require('./core/helpers/infograph.helper');

const clientService = require('./modules/clients/client.service');
const expenseService = require('./modules/expenses/expense.service');

const logRequest = (message, requestContext) => {
    const isHumanRequest = !infographHelper(requestContext).isInstrospectionQuery();
    logHelper.log(message, requestContext, isHumanRequest);
};

const serverService = new ServerService(ApolloServer);
serverService
    .services([
        clientService,
        expenseService
    ])
    .plugins([{
        requestDidStart(requestContext) {
            logRequest('Tria server API request started: ' + requestContext.request.query, requestContext);
        },
        willSendResponse(requestContext) {
            logRequest('Tria server API request responded ' + requestContext.request.query, requestContext);
        }
    }])
    .listen();


var _ApolloServer = null;
var _typeDefs = '';
var _resolvers = { Query: {}, Mutation: {} };
var _plugins = [];

const _setTypeDefs = function (services) {
    _typeDefs = `

        type Query {
            ${services.map(service => service.schema.querys).join('')}
        }
    
        type Mutation {
            ${services.map(service => service.schema.mutations).join('')}
        }
    
        ${services.map(service => service.schema.types).join('')}
        
    `;
}

const _setResolvers = function (services) {
    services.forEach(service => {
        if (!service.resolver) return;

        const serviceResolver = service.resolver(service.service);

        serviceResolver.querys &&
            Object.assign(_resolvers.Query, service.resolver(service.service).querys());

        serviceResolver.mutations &&
            Object.assign(_resolvers.Mutation, service.resolver(service.service).mutations());
    });
}

const exposedObject = function (ApolloServer) {
    _ApolloServer = ApolloServer;
}

exposedObject.prototype = {
    services: function (services) {

        _setTypeDefs.call(this, services);

        _setResolvers.call(this, services);

        return this;
    },

    plugins: function (plugins) {
        _plugins = plugins;
        return this;
    },

    listen: function () {
        const server = new _ApolloServer({
            typeDefs: _typeDefs,
            resolvers: _resolvers,
            plugins: _plugins
        });
        server.listen();
    }
}

module.exports = exposedObject;

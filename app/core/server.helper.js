const _typeDefs = (services) => `

	type Query {
		${services.map(service => service.schema.querys).join('')}
	}

    type Mutation {
        ${services.map(service => service.schema.mutations).join('')}
    }

    ${services.map(service => service.schema.types).join('')}
	
`;

module.exports = {
    services: (services) => {

        const typeDefs = _typeDefs(services);

        const resolvers = { Query: {}, Mutation: {} };
        services.forEach(service => {
            if (!service.resolver) return;

            const serviceResolver = service.resolver(service.service);

            serviceResolver.querys &&
                Object.assign(resolvers.Query, service.resolver(service.service).querys());

            serviceResolver.mutations &&
                Object.assign(resolvers.Mutation, service.resolver(service.service).mutations());
        });

        return { config: { typeDefs, resolvers } }
    }
};
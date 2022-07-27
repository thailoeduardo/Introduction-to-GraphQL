const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');

const typeDefs = gql`
	type User {
		_id: ID!
		name: String!
		email: String!
		active: Boolean!
	}

	type Query {
		hello: String
		user: [User!]!
		getUserByEmail(email: String!): User!
	}

	type Mutation {
		createUser(name: String, email: String): User!
	}
`;

/**
 * List of the users
 */
const users = [
	{
		_id: String(Math.random() * 100),
		name: 'Usuário 1',
		email: 'usuario1@email.com',
		active: true,
	},
	{
		_id: String(Math.random() * 100),
		name: 'Usuário 2',
		email: 'usuario2@email.com',
		active: true,
	},
	{
		_id: String(Math.random() * 100),
		name: 'Usuário 3',
		email: 'usuario3@email.com',
		active: false,
	},
];

const resolvers = {
	Query: {
		hello: () => 'Hello World',
		user: () => users,
		getUserByEmail: (_, args) => {
			return users.find((user) => user.email == args.email);
		},
	},

	Mutation: {
		createUser: (_, args) => {
			const newUser = {
				_id: String(Math.random()),
				name: args.name,
				email: args.email,
				active: true,
			};

			users.push(newUser);

			return newUser;
		},
	},
};

//
const server = new ApolloServer({
	typeDefs,
	resolvers,
	csrfPrevention: true,
	cache: 'bounded',
	plugins: [
		ApolloServerPluginLandingPageLocalDefault({
			embed: true,
		}),
	],
});

/**
 * Init server
 */
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});

import { ApolloServer } from 'apollo-server-lambda'
import { schemas as typeDefs } from './schema'
import { resolvers } from './resolvers'

const server: ApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        endpoint: "/v1/graphql"
    }
});

export const handler: any = server.createHandler();
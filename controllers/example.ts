import {Request, Response} from 'express'

export default {
    name: 'Example',
    path: '/example/:id',
    methods: {
        GET: (request: Request, response: Response) => {
            response.send('GET: ' + request.params.id);
        }
    },
    schema: `
        extend type Query {
            Example(id: Int!): Example
        }
    `,
    resolvers: {
        Query: {
            Example: (parent, args, context, info) => ({id: args.id})
        }
    }
}
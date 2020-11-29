export default {
    name: 'Examples',
    path: '/examples',
    methods: {
        GET: (request, response) => {
            response.send('GET');
        },
        POST: (request, response) => {
            response.send('POST');
        },
        PUT: (request, response) => {
            response.send('PUT');
        },
        DELETE: (request, response) => {
            response.send('DELETE');
        },
    },
    schema: `
        extend type Query {
            Examples: [Example]
        }
        type Example {
            id: Int!
        }
    `,
    resolvers: {
        Query: {
            Examples: () => [{id: 1}, {id: 2}]
        }
    }
}
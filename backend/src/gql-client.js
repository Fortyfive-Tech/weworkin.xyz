import { GraphQLClient } from 'graphql-request'

const gqlClient = new GraphQLClient(process.env.HASURA_ENDPOINT, {
    headers: {
        'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET
    }
})

export default gqlClient

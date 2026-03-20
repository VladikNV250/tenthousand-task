import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolvers } from './graphql/resolvers/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const typeDefs = readFileSync(join(__dirname, 'graphql/schema.graphql'), 'utf-8')

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
})

console.log(`Server ready at: ${url}`)

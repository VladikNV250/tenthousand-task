import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    overwrite: true,
    schema: 'http://localhost:4000/graphql',
    documents: ['src/**/*.graphql'],
    generates: {
        'src/services/__generated__/graphql-types.ts': {
            plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
            config: {
                documentMode: 'string',
            },
        },
        'src/services/__generated__/generated.ts': {
            preset: 'import-types',
            presetConfig: {
                typesPath: './graphql-types',
            },
            plugins: [
                {
                    add: {
                        content: "import { TypedDocumentString } from './graphql-types';",
                    },
                },
                'typescript-rtk-query',
            ],
            config: {
                importBaseApiFrom: '@/services/baseApi',
                exportHooks: true,
                documentMode: 'external',
                importDocumentNodeExternallyFrom: './graphql-types',
            },
        },
    },
}

export default config

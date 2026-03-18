import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    overwrite: true,
    schema: 'http://localhost:4000/graphql',
    documents: ['src/**/*.graphql'],
    generates: {
        'src/services/__generated__/graphql.ts': {
            plugins: [
                {
                    /**
                     * WORKAROUND: Manually injecting the TypedDocumentString class.
                     * * We use `documentMode: 'string'` to generate lightweight string queries instead of heavy ASTs to reduce bundle size.
                     * However, the `typescript-rtk-query` plugin generates `new TypedDocumentString(...)` instantiations but
                     * fails to generate the actual class declaration.
                     * Using the `typed-document-node` plugin alongside it causes "Identifier has already been declared" conflicts.
                     * To fix this, we omit `typed-document-node` and manually inject the class definition here using the `add` plugin.
                     */
                    add: {
                        content: `
export interface DocumentTypeDecoration<TResult, TVariables> {
  __apiType?: (TResult & TVariables) extends never ? never : any;
}
export class TypedDocumentString<TResult, TVariables> extends String implements DocumentTypeDecoration<TResult, TVariables> {
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];
  constructor(private value: string, public __meta__?: Record<string, any>) { super(value); }
  toString(): string & DocumentTypeDecoration<TResult, TVariables> { return this.value; }
}
                        `,
                    },
                },
                'typescript',
                'typescript-operations',
                'typescript-rtk-query',
            ],
            config: {
                importBaseApiFrom: '../baseApi',
                exportHooks: true,
                documentMode: 'string',
            },
        },
    },
}

export default config

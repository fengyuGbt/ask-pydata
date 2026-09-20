import {defineType, defineField} from 'sanity'

export const apiEquivalent = defineType({
  name: 'apiEquivalent',
  title: 'API Equivalent',
  type: 'document',
  fields: [
    defineField({name: 'fromLibrary', type: 'reference', to: [{type: 'library'}], validation: (r) => r.required()}),
    defineField({name: 'fromApi', type: 'string', validation: (r) => r.required(), description: 'e.g. "df.groupby(col).agg(...)"'}),
    defineField({name: 'toLibrary', type: 'reference', to: [{type: 'library'}], validation: (r) => r.required()}),
    defineField({name: 'toApi', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'semanticDiff', type: 'text', description: 'Default values, eager/lazy, return type differences'}),
    defineField({name: 'notes', type: 'text'}),
    defineField({name: 'appliesFrom', type: 'string', description: 'Version range, e.g. "polars >= 1.0"'}),
    defineField({name: 'sourceUrl', type: 'url', validation: (r) => r.required()}),
  ],
})

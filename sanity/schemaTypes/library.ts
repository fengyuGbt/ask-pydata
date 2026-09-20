import {defineType, defineField} from 'sanity'

export const library = defineType({
  name: 'library',
  title: 'Library',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'language', type: 'string', description: 'Implementation language, e.g. Python / Rust / C++'}),
    defineField({name: 'engine', type: 'string', options: {list: ['eager', 'lazy', 'hybrid']}}),
    defineField({name: 'memoryModel', type: 'string', description: 'in-memory / columnar / out-of-core'}),
    defineField({name: 'apiSurface', type: 'string', options: {list: ['DataFrame API', 'SQL', 'Both']}}),
    defineField({name: 'currentVersion', type: 'string'}),
    defineField({name: 'releaseDate', type: 'datetime'}),
    defineField({name: 'streamingEngine', type: 'boolean'}),
    defineField({name: 'license', type: 'string'}),
    defineField({name: 'docsUrl', type: 'url'}),
    defineField({name: 'sourceUrl', type: 'url', validation: (r) => r.required()}),
  ],
})

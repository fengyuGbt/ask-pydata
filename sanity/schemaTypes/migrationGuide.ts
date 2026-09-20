import {defineType, defineField} from 'sanity'

export const migrationGuide = defineType({
  name: 'migrationGuide',
  title: 'Migration Guide',
  type: 'document',
  fields: [
    defineField({name: 'fromLibrary', type: 'reference', to: [{type: 'library'}], validation: (r) => r.required()}),
    defineField({name: 'toLibrary', type: 'reference', to: [{type: 'library'}], validation: (r) => r.required()}),
    defineField({name: 'concept', type: 'string', description: 'e.g. "index" / "apply" / "chained assignment"'}),
    defineField({name: 'pandasWay', type: 'text'}),
    defineField({name: 'polarsWay', type: 'text'}),
    defineField({name: 'caveats', type: 'text', description: 'Behavior differences, performance pitfalls'}),
    defineField({name: 'sourceUrl', type: 'url', validation: (r) => r.required()}),
  ],
})

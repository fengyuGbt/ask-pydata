import {defineType, defineField} from 'sanity'

export const versionNote = defineType({
  name: 'versionNote',
  title: 'Version Note',
  type: 'document',
  fields: [
    defineField({name: 'library', type: 'reference', to: [{type: 'library'}], validation: (r) => r.required()}),
    defineField({name: 'version', type: 'string', description: 'e.g. "3.0.0" / "2.0.0"'}),
    defineField({name: 'changeType', type: 'string', options: {list: ['breaking', 'deprecated', 'new', 'behavior-change']}}),
    defineField({name: 'summary', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'migrationImpact', type: 'text', description: 'Impact on existing code and how to fix'}),
    defineField({name: 'effectiveFrom', type: 'datetime'}),
    defineField({name: 'sourceUrl', type: 'url', validation: (r) => r.required()}),
  ],
})

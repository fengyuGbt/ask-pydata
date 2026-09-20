import {defineType, defineField} from 'sanity'

export const comparisonClaim = defineType({
  name: 'comparisonClaim',
  title: 'Comparison Claim',
  type: 'document',
  fields: [
    defineField({name: 'claim', type: 'string', validation: (r) => r.required(), description: 'e.g. "polars is 5x faster than pandas"'}),
    defineField({name: 'libraries', type: 'array', of: [{type: 'reference', to: [{type: 'library'}]}]}),
    defineField({name: 'verdict', type: 'string', description: 'Synthesized conclusion'}),
    defineField({name: 'confidenceScore', type: 'number', validation: (r) => r.min(0).max(1)}),
    defineField({name: 'status', type: 'string', options: {list: ['confirmed', 'disputed', 'deprecated']}}),
    defineField({
      name: 'sources',
      title: 'Multiple sources (show contradictions side by side)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string'},
            {name: 'quote', type: 'text'},
            {name: 'url', type: 'url'},
          ],
        },
      ],
    }),
    defineField({name: 'sourceUrl', type: 'url'}),
  ],
})

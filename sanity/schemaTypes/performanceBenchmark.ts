import {defineType, defineField} from 'sanity'

export const performanceBenchmark = defineType({
  name: 'performanceBenchmark',
  title: 'Performance Benchmark',
  type: 'document',
  fields: [
    defineField({name: 'library', type: 'reference', to: [{type: 'library'}], validation: (r) => r.required()}),
    defineField({name: 'dataset', type: 'string', description: 'e.g. "1GB CSV, 10M rows"'}),
    defineField({name: 'operation', type: 'string', description: 'e.g. "groupby-agg"'}),
    defineField({name: 'metric', type: 'string', options: {list: ['time', 'memory']}}),
    defineField({name: 'value', type: 'number'}),
    defineField({name: 'unit', type: 'string', options: {list: ['ms', 's', 'MB', 'GB']}}),
    defineField({name: 'environment', type: 'string', description: 'e.g. "M2 Mac, polars 2.0"'}),
    defineField({name: 'benchmarkDate', type: 'datetime'}),
    defineField({name: 'sourceUrl', type: 'url', validation: (r) => r.required()}),
  ],
})

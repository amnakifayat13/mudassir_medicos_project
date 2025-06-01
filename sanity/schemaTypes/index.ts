import { type SchemaTypeDefinition } from 'sanity'
import medicines from "./medicines"
import category from './category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [medicines, category],
}

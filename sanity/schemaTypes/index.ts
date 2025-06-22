import { type SchemaTypeDefinition } from 'sanity'
import medicines from "./medicines"
import category from './category'
import {order} from "./order"


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [medicines, category, order],
}

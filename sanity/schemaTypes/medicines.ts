export default {
  name: 'medicine',
  title: 'Medicine',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Medicine Name',
      type: 'string',
    },
    
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'stock',
      title: 'Stock',
      type: 'number',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
     
    },
  ],
}

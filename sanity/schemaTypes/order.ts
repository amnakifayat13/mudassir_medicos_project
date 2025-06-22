// In your Sanity schema (e.g., `schemas/order.js`)
export const order = {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'fullName',
        title: 'Full Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email Address',
        type: 'string',
      },
      {
        name: 'phoneNumber',
        title: 'Phone Number',
        type: 'string',
      },
      {
        name: 'address',
        title: 'Address',
        type: 'string',
      },
      {
        name: 'city',
        title: 'City',
        type: 'string',
      },
      
      {
        name: 'country',
        title: 'Country',
        type: 'string',
      },
    ],
  };
  
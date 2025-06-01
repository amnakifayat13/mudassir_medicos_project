import { client } from "@/sanity/lib/client";

export const checkStockInSanity = async (itemId: string) => {
    try {
      
      const query = `*[_type == "medicine" && _id == $itemId]{
        stock
      }`;
  
      const params = { itemId };
      const data = await client.fetch(query, params);
  
      if (data.length > 0) {
        return data[0].stock; 
      } else {
        return 0; 
      }
    } catch (error) {
      console.error('Error fetching stock from Sanity:', error);
      return 0; 
    }
  };
  
import { client } from '@/sanity/lib/client';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

// Define the CartItem type
export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  category: string;
};

// Initial state type
interface CartState {
  items: CartItem[];
  loading: boolean; // To handle loading state for async actions
}

// Create an async thunk to handle stock update after payment
export const updateStockAfterPayment = createAsyncThunk(
  'cart/updateStockAfterPayment',
  async (cartItems: CartItem[], { rejectWithValue }) => {
    try {
      for (const item of cartItems) {
        const product = await client.fetch(
          `*[_type == "product" && _id == $id][0]`,
          { id: item.id }
        );

        if (product) {
          const updatedStock = product.stockQuantity - item.quantity;

          // If stock is available, update the stock quantity
          if (updatedStock >= 0) {
            await client
              .patch(item.id) // Document ID
              .set({ stockQuantity: updatedStock }) // Update the stockQuantity field
              .commit(); // Commit the changes
          } else {
            console.log(`Not enough stock for ${item.name}`);
            // Handle out-of-stock scenario
          }
        }
      }
    } catch (error) {
      console.error('Error updating stock in Sanity:', error);
      return rejectWithValue('Error updating stock');
    }
  }
);

// Create the cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false, // Initialize loading state
  } as CartState,
  reducers: {
    // Action to add an item to the cart
    addItem(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // If the item exists, increase the quantity
        existingItem.quantity += 1;
      } else {
        // If the item doesn't exist, add it with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }

      // Sync the cart to localStorage after modification
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },

    // Action to remove an item from the cart
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          // If quantity is greater than 1, decrease it by 1
          existingItem.quantity -= 1;
        } else {
          // If quantity is 1, remove the item from the cart
          state.items = state.items.filter(item => item.id !== action.payload.id);
        }
      }

      // Sync the cart to localStorage after modification
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },

    // Action to clear the entire cart
    clearCart: (state) => {
      state.items = [];
      // Sync the cart to localStorage after clearing
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },

    // Action to update the quantity of an item
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        // Update the quantity of the item
        item.quantity = action.payload.quantity;
      }

      // Sync the cart to localStorage after modification
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },

    // Action to sync the cart with fetched products from Sanity
    syncSanityProducts(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload; // Directly set the items from Sanity

      // Sync the cart to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },

    // Action to load cart from localStorage
    loadCartFromLocalStorage(state) {
      if (typeof window !== 'undefined') {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
          state.items = JSON.parse(cartData);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateStockAfterPayment.pending, (state) => {
        state.loading = true; // Set loading to true when stock update starts
      })
      .addCase(updateStockAfterPayment.fulfilled, (state) => {
        state.loading = false; // Set loading to false after stock update is successful
      })
      .addCase(updateStockAfterPayment.rejected, (state) => {
        state.loading = false; // Set loading to false if there is an error during stock update
      });
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  syncSanityProducts,
  loadCartFromLocalStorage,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

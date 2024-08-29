import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface CartItem {
  id: string;
  productid: string;
  quantity: number;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const addItem = createAsyncThunk(
  "cart/addItem",
  async (item: CartItem) => {
    const res = await axios.post("http://localhost:5000/api/cartItems", item);
    return res.data;
  }
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (id: string) => {
    const res = await axios.delete(`http://localhost:5000/api/cartItems/${id}`);
    return res.data;
  }
);

export const updateItemQuantity = createAsyncThunk(
  "cart/updateItemQuantity",
  async (item: CartItem) => {
    const res = await axios.put(
      `http://localhost:5000/api/cartItems/${item.id}/quantity`,
      item
    );
    return res.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers:(builder) =>{
    builder.addCase(addItem.fulfilled, (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    });
    builder.addCase(removeItem.fulfilled, (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    });
    builder.addCase(updateItemQuantity.fulfilled, (state, action: PayloadAction<CartItem>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      state.items[index] = action.payload;
    });
  }
});

export const { clearCart } = cartSlice.actions;

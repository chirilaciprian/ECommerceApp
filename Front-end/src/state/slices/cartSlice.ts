import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  CartProps,
  CartItemProps,
  AddCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  ClearCart,
} from "../../services/cartService";
import {
  fetchCartItems,
  fetchCart,
  deleteCartItem,
} from "../../services/cartService";

export interface CartState extends CartProps {
  status: "idle" | "loading" | "succeeded" | "failed";
}

export const initialState: CartState = {
  id: "",
  userId: "",
  cartItems: [],
  totalPrice: 0,
  status: "idle",
};

export const getCart = createAsyncThunk("cart/getCart", async () => {
  try {
    const cartItems = await fetchCartItems();
    const cart = await fetchCart();
    return {
      id: cart.id,
      userId: cart.userId,
      cartItems: cartItems,
      totalPrice: cart.totalPrice,
    };
  } catch (err) {
    console.log(err);
    throw new Error("Redux thunk error, failed to fetch cart");
  }
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartItem: CartItemProps) => {
    try {
      const res = await AddCartItem(cartItem.productId, cartItem.cartId, cartItem.size);
      return res;
    } catch (err) {
      console.log(err);
      throw new Error("Redux thunk error, failed to add item to cart");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id: string) => {
    try {
      const res = await deleteCartItem(id);
      return res.id;
    } catch (err) {
      console.log(err);
      throw new Error("Redux thunk error, failed to remove item from cart");
    }
  }
);

export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (cartItem: CartItemProps) => {
    return await increaseCartItemQuantity(cartItem);
  }
);

export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (cartItem: CartItemProps) => {
    return await decreaseCartItemQuantity(cartItem);
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (cart: CartProps) => {
    return await ClearCart(cart);
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state: CartState) => {
        state.status = "loading";
      })
      .addCase(
        getCart.fulfilled,
        (state: CartState, action: PayloadAction<CartProps>) => {
          state.status = "succeeded";
          state.id = action.payload.id;
          state.userId = action.payload.userId;
          state.cartItems = action.payload.cartItems;
          state.totalPrice = action.payload.totalPrice;
        }
      )
      .addCase(getCart.rejected, (state: CartState) => {
        state.status = "failed";
      })
      .addCase(addToCart.pending, (state: CartState) => {
        state.status = "loading";
      })
      .addCase(
        addToCart.fulfilled,
        (state: CartState, action: PayloadAction<CartItemProps>) => {
          state.status = "succeeded";
          state.cartItems.push(action.payload);
          console.log("Payload:", action.payload);
          state.totalPrice = state.cartItems.reduce((total, item) => {
            return total + item.price;
          }, 0);
        }        
      )
      .addCase(addToCart.rejected, (state: CartState) => {
        state.status = "failed";
      })
      .addCase(removeFromCart.pending, (state: CartState) => {
        state.status = "loading";
      })
      .addCase(
        removeFromCart.fulfilled,
        (state: CartState, action: PayloadAction<string>) => {
          console.log("Payload (ID to remove):", action.payload);
          state.status = "succeeded";
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload
          );
          state.totalPrice = state.cartItems.reduce((total, item) => {
            return total + item.price;
          }, 0);
        }
      )
      .addCase(removeFromCart.rejected, (state: CartState) => {
        state.status = "failed";
      })
      .addCase(increaseQuantity.pending, (state: CartState) => {
        state.status = "loading";
      })
      .addCase(
        increaseQuantity.fulfilled,
        (state: CartState, action: PayloadAction<CartItemProps>) => {
          state.status = "succeeded";
          state.cartItems = state.cartItems.map((item) => {
            if (item.id === action.payload.id) {
              return action.payload;
            }
            return item;
          });
          state.totalPrice = state.cartItems.reduce((total, item) => {
            return total + item.price;
          }, 0);
        }
      )
      .addCase(increaseQuantity.rejected, (state: CartState) => {
        state.status = "failed";
      })
      .addCase(decreaseQuantity.pending, (state: CartState) => {
        state.status = "loading";
      })
      .addCase(
        decreaseQuantity.fulfilled,
        (state: CartState, action: PayloadAction<CartItemProps>) => {
          state.status = "succeeded";
          state.cartItems = state.cartItems.map((item) => {
            if (item.id === action.payload.id) {
              item = action.payload;
            }
            return item;
          });
          state.totalPrice = state.cartItems.reduce((total, item) => {
            return total + item.price;
          }, 0);
        }
      )
      .addCase(decreaseQuantity.rejected, (state: CartState) => {
        state.status = "failed";
      })
      .addCase(clearCart.pending, (state: CartState) => {
        state.status = "loading";
      })
      .addCase(clearCart.fulfilled, (state: CartState) => {
        state.status = "succeeded";
        state.cartItems = [];
        state.totalPrice = 0;
      })
      .addCase(clearCart.rejected, (state: CartState) => {
        state.status = "failed";
      });
  },
});

export default cartSlice.reducer;

// import * as productService from "../../services/productService";
// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// export interface ProductState {
//   products: productService.ProductProps[];
//   status: "idle" | "loading" | "succeeded" | "failed";
// }

// const initialState: ProductState = {
//   products: [],
//   status: "idle",
// };

// export const getProducts = createAsyncThunk(
//   "products/getProducts",
//   async () => {
//     try {
//       const res = await productService.fetchProducts();
//       return res;
//     } catch (err) {
//       console.log(err);
//       return err;
//     }
//   }
// );

// export const productsSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getProducts.pending, (state:ProductState) => {
//         state.status = "loading";
//       })
//       .addCase(getProducts.fulfilled, (state:ProductState, action:PayloadAction<productService.ProductProps[]>) => {
//         state.status = "succeeded";
//         state.products = action.payload;
//       })
//       .addCase(getProducts.rejected, (state:ProductState) => {
//         state.status = "failed";
//       });
//   },
// });

// export default productsSlice.reducer;


import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    WishlistProps,
    WishlistItemProps,
    fetchWishlist,
    fetchWishlistItems,
    addWishlistItem,
    deleteWishlistItem,
} from "../../services/wishlistService";

export interface WishlistState extends WishlistProps {
    status: "idle" | "loading" | "succeeded" | "failed";
}

export const initialState: WishlistState = {
    id: "",
    userId: "",
    status: "idle",
    wishlistItems: [],    
};

export const getWishlist = createAsyncThunk("wishlist/getWishlist", async () => {
    try {
        const wishlist = await fetchWishlist();
        const wishlistItems = await fetchWishlistItems(wishlist.id);
        return {
            id: wishlist.id,
            userId: wishlist.userId,
            wishlistItems: wishlistItems,            
        }
    } catch (err) {
        console.log(err);
        throw new Error("Redux thunk error, failed to fetch wishlist");
    }
});

export const addToWishlist = createAsyncThunk("wishlist/addToWishlist", async (wishlistItem: WishlistItemProps) => {
    try {
        const res = await addWishlistItem(wishlistItem.productId, wishlistItem.wishlistId);
        return res;
    }
    catch (err) {
        console.log(err);
        throw new Error("Redux thunk error, failed to add item to wishlist");
    }
});

export const removeFromWishlist = createAsyncThunk("wishlist/removeFromWishlist", async (id: string) => {
    try {
        const res = await deleteWishlistItem(id);
        return res.id;
    }
    catch (err) {
        console.log(err);
        throw new Error("Redux thunk error, failed to remove item from wishlist");
    }
})

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWishlist.pending, (state) => {
            state.status = "loading";
        })
            .addCase(getWishlist.fulfilled, (state, action: PayloadAction<WishlistProps>) => {
                state.status = "succeeded";
                state.id = action.payload.id;
                state.userId = action.payload.userId;
                state.wishlistItems = action.payload.wishlistItems;                
            })
            .addCase(getWishlist.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(addToWishlist.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addToWishlist.fulfilled, (state, action: PayloadAction<WishlistItemProps>) => {
                state.status = "succeeded";
                state.wishlistItems.push(action.payload);
            })
            .addCase(addToWishlist.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(removeFromWishlist.pending, (state) => {
                state.status = "loading";
            })
            .addCase(removeFromWishlist.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = "succeeded";
                state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload);
            })
            .addCase(removeFromWishlist.rejected, (state) => {
                state.status = "failed";
            })
    }
})

export default wishlistSlice.reducer;
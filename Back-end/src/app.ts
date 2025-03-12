import express from "express";
import categoryRouter from "./routes/categoryRoutes";
import { errorHandler } from "./errors/errorHandler";
import authRouter from "./routes/authRoutes";
import productRouter from "./routes/productRoutes";
import userRouter from "./routes/userRoutes";
import orderRouter from "./routes/orderRoutes";
import orderItemRouter from "./routes/orderItemRoutes";
import cartRouter from "./routes/cartRoutes";
import cartItemRouter from "./routes/cartItemRoutes";
import ratingRouter from "./routes/ratingRoutes";
import wishlistRouter from "./routes/wishlistRoutes";
import wishlistItemRouter from "./routes/wishlistItemRoutes";
import emailRouter from "./routes/emailRoutes";
import { CORS_ORIGIN } from './config/env';

const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
  })
);

app.use(express.json());
app.use("/api/categories", categoryRouter);
app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/orderItems", orderItemRouter);
app.use("/api/carts", cartRouter);
app.use("/api/cartItems", cartItemRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/wishlists", wishlistRouter);
app.use("/api/wishlistItems", wishlistItemRouter);
app.use("/api/emails", emailRouter);

app.use(errorHandler);

export default app;

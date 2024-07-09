import express from "express";
import categoryRouter from "./routes/categoryRoutes";
import { errorHandler } from "./errors/errorHandler";
import authRouter from "./routes/authRoutes";
import productRouter from "./routes/productRoutes";
import userRouter from "./routes/useRoutes";
import orderRouter from "./routes/orderRoutes";
import orderItemRouter from "./routes/orderItemRoutes";
import cartRouter from "./routes/cartRoutes";
import cartItemRouter from "./routes/cartItemRoutes";

const app = express();

app.use(express.json());
app.use("/api/categories", categoryRouter);
app.use("/api", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/orderItems", orderItemRouter);
app.use("/api/carts",cartRouter)
app.use("/api/cartItems",cartItemRouter)

app.use(errorHandler);

export default app;

import mongoose from "mongoose";
import { App } from "./app";
import UserRouter from "./routes/user.routes";
import ProductRouter from "./routes/product.routes";
import CategoryRouter from "./routes/category.routes";
import ReviewRouter from "./routes/review.routes";

// Implement App Router
const app = new App([new UserRouter(), new ProductRouter(), new CategoryRouter(), new ReviewRouter()]);

// Listen the server
app.listenServer();
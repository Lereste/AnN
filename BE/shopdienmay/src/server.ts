import mongoose from "mongoose";
import { App } from "./app";
import UserRouter from "./routes/user.routes";
import ProductRouter from "./routes/product.routes";

// Implement App Router
const app = new App([new UserRouter(), new ProductRouter()]);

// Listen the server
app.listenServer();
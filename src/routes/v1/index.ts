
import userRoutes from "./users-routes";
import productRoutes from "./products-routes";
import { Application } from 'express';


export default (app:Application):void => {
    app.use("/api/v1/users", userRoutes);
    app.use("/api/v1/products", productRoutes);
};
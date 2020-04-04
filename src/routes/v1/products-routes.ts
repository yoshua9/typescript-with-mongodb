import express from "express";
import productController from "../../controllers/v1/products-controller";

const router = express.Router();

router.post("/create", productController.createProduct);
router.post("/delete", productController.deleteProduct);
router.post("/update", productController.updateProduct);
router.get("/get-all", productController.getProducts);
router.get("/get-by-user/:userId", productController.getProductsByUser);

export default router;
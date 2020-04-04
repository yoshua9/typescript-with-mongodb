import {Request,Response} from 'express';
import Products from '../../mongo/models/products';


const createProduct = async(req:Request, res:Response): Promise<void> => {
    try {
        const { title, desc, price, images, userID } = req.body;

        const product = new Products();
        product.title = title;
        product.desc = desc;
        product.price = price;
        product.images = images;
        product.user = userID;
        await product.save();

        res.send({ status: "ok", data: product });
    } catch (e) {
        console.log("error: ", e);
        res.status(500).send({ status: "ERROR", data: e.message });
    }
}
const deleteProduct = (req:Request, res:Response):void => {
    console.log('');
}
const getProducts = async(req:Request, res:Response): Promise<void> => {
    try {
        const products = await Products.find({ price: { $gt: 14 } })
            .select('title desc price')
            .populate('user', 'username email data role');
        res.send({ status: "ok", data: products });
    } catch (e) {
        console.log("error: ", e);
        res.status(500).send({ status: "ERROR", data: e.message });
    }
}

const getProductsByUser = async(req:Request, res:Response): Promise<void> => {
    try {
        const products = await Products.findOne({ user: req.params.userID });
        console.log(products);
        res.send({ status: "ok", data: products });
    } catch (e) {
        console.log("error: ", e);
        res.status(500).send({ status: "ERROR", data: e.message });
    }
}
const updateProduct = (req:Request, res:Response):void => {
    console.log('');
}


export default { createProduct, deleteProduct, getProducts, updateProduct, getProductsByUser }
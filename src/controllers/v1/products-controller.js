var Products = require('../../mongo/models/products');


const createProduct = async(req, res) => {
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
const deleteProduct = (req, res) => {

}
const getProducts = async(req, res) => {
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

const getProductsByUser = async(req, res) => {
    try {
        const products = await Products.findOne({ user: req.params.userID });
        console.log(products);
        res.send({ status: "ok", data: products });
    } catch (e) {
        console.log("error: ", e);
        res.status(500).send({ status: "ERROR", data: e.message });
    }
}
const updateProduct = (req, res) => {

}


module.exports = { createProduct, deleteProduct, getProducts, updateProduct, getProductsByUser }
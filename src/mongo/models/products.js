const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const { Schema } = mongoose;

const productsSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [{ type: String, required: true }], default: [] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});

const product = mongoose.model('Product', productsSchema);

module.exports = product;
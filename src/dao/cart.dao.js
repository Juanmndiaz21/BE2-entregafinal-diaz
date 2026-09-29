const Cart = require('../models/cart.model');

class CartDAO {
    create(data = { products: [] }) { return Cart.create(data); }
    findById(id, populate = false) {
        const query = Cart.findById(id);
        return populate ? query.populate('products.product') : query;
    }
    updateProducts(id, products) { return Cart.findByIdAndUpdate(id, { products }, { new: true }); }
    addProduct(id, productId, quantity) {
        return Cart.findOneAndUpdate(
            { _id: id, 'products.product': productId },
            { $inc: { 'products.$.quantity': quantity } },
            { new: true }
        ).then((cart) => cart || Cart.findByIdAndUpdate(id, { $push: { products: { product: productId, quantity } } }, { new: true }));
    }
}

module.exports = CartDAO;

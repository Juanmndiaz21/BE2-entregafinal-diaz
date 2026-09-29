const CartDAO = require('../dao/cart.dao');

class CartRepository {
    constructor(dao = new CartDAO()) { this.dao = dao; }
    create(data) { return this.dao.create(data); }
    findById(id, populate = false) { return this.dao.findById(id, populate); }
    updateProducts(id, products) { return this.dao.updateProducts(id, products); }
    addProduct(id, productId, quantity) { return this.dao.addProduct(id, productId, quantity); }
}

module.exports = CartRepository;

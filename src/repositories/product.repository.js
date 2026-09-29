const ProductDAO = require('../dao/product.dao');

class ProductRepository {
    constructor(dao = new ProductDAO()) { this.dao = dao; }
    findAll() { return this.dao.findAll(); }
    findById(id) { return this.dao.findById(id); }
    create(data) { return this.dao.create(data); }
    update(id, data) { return this.dao.update(id, data); }
    delete(id) { return this.dao.delete(id); }
    decreaseStock(id, quantity) { return this.dao.decreaseStock(id, quantity); }
}

module.exports = ProductRepository;

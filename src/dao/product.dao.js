const Product = require('../models/product.model');

class ProductDAO {
    findAll() { return Product.find(); }
    findById(id) { return Product.findById(id); }
    create(data) { return Product.create(data); }
    update(id, data) { return Product.findByIdAndUpdate(id, data, { new: true, runValidators: true }); }
    delete(id) { return Product.findByIdAndDelete(id); }
    decreaseStock(id, quantity) { return Product.findOneAndUpdate({ _id: id, stock: { $gte: quantity } }, { $inc: { stock: -quantity } }, { new: true }); }
}

module.exports = ProductDAO;

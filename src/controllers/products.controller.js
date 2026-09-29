const { productRepository } = require('../repositories');

const getProducts = async (req, res) => res.json({ status: 'success', payload: await productRepository.findAll() });
const createProduct = async (req, res) => res.status(201).json({ status: 'success', payload: await productRepository.create(req.body) });
const updateProduct = async (req, res) => {
    const product = await productRepository.update(req.params.pid, req.body);
    if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado.' });
    return res.json({ status: 'success', payload: product });
};
const deleteProduct = async (req, res) => {
    const product = await productRepository.delete(req.params.pid);
    if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado.' });
    return res.json({ status: 'success', payload: product });
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };

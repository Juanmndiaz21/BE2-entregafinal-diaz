const { cartRepository, productRepository, ticketRepository } = require('../repositories');

const addProduct = async (req, res) => {
    const { cid, pid } = req.params;
    const quantity = Number(req.body.quantity || 1);
    if (!Number.isInteger(quantity) || quantity < 1) return res.status(400).json({ status: 'error', message: 'La cantidad debe ser un entero positivo.' });
    const [cart, product] = await Promise.all([cartRepository.findById(cid), productRepository.findById(pid)]);
    if (!cart || !product) return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado.' });
    const updatedCart = await cartRepository.addProduct(cid, pid, quantity);
    return res.json({ status: 'success', payload: updatedCart });
};

const purchase = async (req, res) => {
    const cart = await cartRepository.findById(req.params.cid, true);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado.' });
    const pending = [];
    const purchased = [];
    let amount = 0;
    for (const item of cart.products) {
        const product = item.product;
        if (!product) { pending.push(String(item.product)); continue; }
        // La operación condicional evita descontar stock cuando ya no alcanza.
        const updatedProduct = await productRepository.decreaseStock(product._id, item.quantity);
        if (!updatedProduct) { pending.push(String(product._id)); continue; }
        amount += product.price * item.quantity;
        purchased.push(String(product._id));
    }
    if (purchased.length) {
        const remaining = cart.products.filter((item) => !purchased.includes(String(item.product?._id || item.product)));
        await cartRepository.updateProducts(cart._id, remaining);
    }
    const ticket = purchased.length ? await ticketRepository.create({ amount, purchaser: req.user.email }) : null;
    return res.json({ status: 'success', ticket, productsNotProcessed: pending });
};

module.exports = { addProduct, purchase };

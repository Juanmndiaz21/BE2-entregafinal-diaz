const UserRepository = require('./user.repository');
const CartRepository = require('./cart.repository');
const ProductRepository = require('./product.repository');
const TicketRepository = require('./ticket.repository');

module.exports = {
    userRepository: new UserRepository(),
    cartRepository: new CartRepository(),
    productRepository: new ProductRepository(),
    ticketRepository: new TicketRepository()
};

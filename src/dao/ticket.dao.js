const Ticket = require('../models/ticket.model');

class TicketDAO {
    create(data) { return Ticket.create(data); }
}

module.exports = TicketDAO;

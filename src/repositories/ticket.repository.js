const TicketDAO = require('../dao/ticket.dao');

class TicketRepository {
    constructor(dao = new TicketDAO()) { this.dao = dao; }
    create(data) { return this.dao.create(data); }
}

module.exports = TicketRepository;

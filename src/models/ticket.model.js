const mongoose = require('mongoose');
const crypto = require('crypto');

const ticketSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true, default: () => `TICKET-${Date.now()}-${crypto.randomUUID()}` },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true, min: 0 },
    purchaser: { type: String, required: true, trim: true }
}, { versionKey: false });

module.exports = mongoose.model('Tickets', ticketSchema);

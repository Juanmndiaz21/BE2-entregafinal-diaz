const UserDAO = require('../dao/user.dao');

class UserRepository {
    constructor(dao = new UserDAO()) { this.dao = dao; }
    findByEmail(email) { return this.dao.findByEmail(email); }
    findById(id) { return this.dao.findById(id); }
    create(data) { return this.dao.create(data); }
    updatePassword(id, password) { return this.dao.updatePassword(id, password); }
}

module.exports = UserRepository;

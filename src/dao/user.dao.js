const User = require('../models/user.model');

class UserDAO {
    findByEmail(email) { return User.findOne({ email }); }
    findById(id) { return User.findById(id); }
    create(data) { return User.create(data); }
    updatePassword(id, password) { return User.findByIdAndUpdate(id, { password }, { new: true }); }
}

module.exports = UserDAO;

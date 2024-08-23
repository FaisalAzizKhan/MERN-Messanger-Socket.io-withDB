// userRepository.js
const User = require('../model/user'); // Import your User model

const getAllUsers = async () => {
    try {
        const users = await User.find(); // DB query
        return users;
    } catch (error) {
        throw error; // Let the controller handle the error
    }
};

module.exports = {
    getAllUsers,
};

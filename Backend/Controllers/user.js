// userController.js
const userRepository = require('../repositories/userRepository'); // Import the repo

const getAllUsersController = async (req, res) => {
    try {
        const users = await userRepository.getAllUsers(); // Call repository method
        res.status(200).json(users); // Send response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving users', error }); // Handle errors
    }
};

module.exports = {
    getAllUsersController,
};

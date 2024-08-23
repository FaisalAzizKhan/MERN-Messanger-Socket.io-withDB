// Controller/messanger.js
const { User } = require('../model/messanger')
const userRepository = require('../Repositories/messanger')  // Import the repo


// Update user's socket ID
const updateSocketIdController = async (req, res) => {
    try {
        const { userId, socketId } = req.body 
        const updatedUser = await userRepository.updateSocketIdRepo(userId, socketId) 

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' }) 
        }

        res.json({ message: 'Socket ID updated successfully', user: updatedUser }) 
    } catch (error) {
        console.error(error) 
        return res.status(500).json({ message: "Server Error", error: error.message }) 
    }
}

// Sign up a new user
const signupController = async (req, res) => {
    try {
        const existingUser = await userRepository.getUserByEmailRepo(req.body.email) 

        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" }) 
        }

        const userRegister = await userRepository.createUserRepo(req.body) 

        return res.status(201).json({
            id: userRegister._id,
            name: userRegister.name,
            email: userRegister.email,
            password: userRegister.password
        }) 
    } catch (error) {
        console.error(error) 
        return res.status(500).json({ message: "Server Error", error: error.message }) 
    }
}

// Get a single user by ID
const getSingleUserFromDBController = async (req, res) => {
    try {
        const user = await userRepository.getUserByIdRepo(req.params.id) 

        if (!user) {
            return res.status(404).json({ error: 'User not found' }) 
        }

        res.json(user) 
    } catch (error) {
        console.error(error) 
        return res.status(500).json({ message: "Server Error", error: error.message }) 
    }
}

// Log in a user
const loginUserController = async (req, res) => {
    try {
        const existingUser = await userRepository.getUserByEmailRepo(req.body.email) 

        if (!existingUser) {
            return res.status(400).json({ message: "Wrong Email" }) 
        }

        const passCheck = await userRepository.comparePasswordRepo(req.body.password, existingUser.password) 

        if (passCheck) {
            res.json({ user: existingUser }) 
        } else {
            res.status(400).json({ message: "Password didn't match" }) 
        }
    } catch (error) {
        console.error(error) 
        return res.status(500).json({ message: "Server Error", error: error.message }) 
    }
}

// Get all users
const getAllUsersController = async (req, res) => {
    try {
        const users = await userRepository.getAllUsersRepo() 
        res.json(users) 
    } catch (error) {
        console.error(error) 
        res.status(500).json({ message: 'Error retrieving users', error }) 
    }
}


module.exports = {
    updateSocketIdController,
    signupController,
    getSingleUserFromDBController,
    loginUserController,
    getAllUsersController
} 

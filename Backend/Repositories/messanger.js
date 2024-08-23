const { User } = require('../model/messanger')  // Corrected model path
const bcrypt = require('bcrypt') 

// Get all users from the table
const getAllUsersRepo = async () => {
    try {
        const users = await User.find()  
        return users 
    } catch (error) {
        throw error 
    }
} 

// Update socketId for a user
const updateSocketIdRepo = async (userId, socketId) => {
    try {
        return await User.findByIdAndUpdate(
            userId,
            { socketId },
            { new: true, useFindAndModify: false }
        ) 
    } catch (error) {
        throw error 
    }
} 

// Create a new user
const createUserRepo = async (userData) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10) 
        return await User.create({
            name: userData.name,
            email: userData.email,
            password: hashedPassword
        }) 
    } catch (error) {
        throw error 
    }
} 

// Get user by ID
const getUserByIdRepo = async (id) => {
    try {
        return await User.findById(id) 
    } catch (error) {
        throw error 
    }
} 

// Get user by email
const getUserByEmailRepo = async (email) => {
    try {
        return await User.findOne({ email }) 
    } catch (error) {
        throw error 
    }
} 

// Compare password
const comparePasswordRepo = async (inputPassword, storedPassword) => {
    try {
        return await bcrypt.compare(inputPassword, storedPassword) 
    } catch (error) {
        throw error 
    }
} 

getAllUsersRepo()
module.exports = {
    updateSocketIdRepo,
    createUserRepo,
    getUserByIdRepo,
    getUserByEmailRepo,
    comparePasswordRepo,
    getAllUsersRepo
} 

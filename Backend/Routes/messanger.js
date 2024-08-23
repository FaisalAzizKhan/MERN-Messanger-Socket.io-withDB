const express = require('express') 
const messagerController = require('../Controllers/messanger') 
const { User } = require('../model/messanger')
const route = express.Router() 

route.put('/updateSocketId', messagerController.updateSocketIdController) 
route.post('/registerUser', messagerController.signupController) 
route.get('/user/:id', messagerController.getSingleUserFromDBController)
route.post('/login', messagerController.loginUserController) 
route.get('/getAllUsers', messagerController.getAllUsersController) 


 
module.exports = route

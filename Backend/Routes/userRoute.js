const express = require("express")
const route = express()
const User = require("../model/user")
const bcrypt = require("bcrypt")



route.post("/login", async(req, res)=>{

    try {
        const existingUser = await User.findOne({email:req.body.email})
        
        if(existingUser){
            const passCheck = await bcrypt.compare(req.body.password, existingUser.password)
            if(passCheck){
                res.send({user: existingUser})
            }
            else{
                res.send({message:"Password didn't Match"})
            }
         }
    
        else{ res.send({message:"Wrong Email"}) } 
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
  

     
})

route.post("/signup", async (req, res) => {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" });
        } else {
            // Create new user
            const userRegister = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10)
            });

            // Send a success response with user data
            return res.status(201).json({
                id: userRegister._id,
                name: userRegister.name,
                email: userRegister.email,
                password: userRegister.password
            });
        }
    } catch (error) {
        // Handle any errors
        console.error(error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

route.post("/insertSocketId/InDatabase", async (req, res) => {
    try {
        const { userId, socketId } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId, // Assuming userId is the MongoDB _id
            { socketId: socketId },
            { new: true, useFindAndModify: false }
        )
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'Socket ID updated successfully', user: updatedUser });
        
    } catch (error) {
        // Handle any errors
        console.error(error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

route.get('/getAllUsers', async (req, res) => {
    try {
      const users = await User.find() 
      res.json(users)
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });
route.get('/getSingleUser/:id', async (req, res) => {
    try {
      const user = await User.findOne({_id: req.params.id}) 
      res.json(user)
    } catch (error) {
      console.error(error);
      res.status(500).json(error)
    }
  });



module.exports = route
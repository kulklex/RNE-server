import express from "express"
import {verifyToken, verifyAdmin} from "../middlewares/verifyToken.ts"
import User from "../models/user.ts"

const router = express.Router()

// Fetch All Users
router.get("/get-users", verifyAdmin, async (req, res) => {
    try {
        const query = req.query.latest
        const users = query ? await User.find().sort({_id: -1}).limit(2) : await User.find()
        if (!users) return res.status(500).send("No available users")
        
        return res.status(200).json({message:"Successfully fetched all users", data:users})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error fetching users"})
    }
})


// Fetch Users Stats
router.get("/stats", verifyAdmin, async (req, res) => {
    try {
        const date = new Date()
        const lastYear =  new Date(date.setFullYear(date.getFullYear() - 1))

        const userStats = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {$project: {
                month: {$month: "$createdAt"},
            }},
            {
                $group: {
                    _id:"$month",
                    total: {$sum:1}
                }
            }
        ])
        return res.status(200).json({message:"Successfully fetched all user stats", data:userStats})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error fetching user stats"})
    }
})

// Update User route
router.put("/update/:id", verifyToken, async(req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        if(!updatedUser) return res.status(400).json({message:"User not found"})

        res.status(200).json({message: "User updated successfully", data:updatedUser})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: `Error updating user: ${error}`})
    }
})


// Delete User route
router.delete("/delete/:id", verifyAdmin, async(req, res)=> {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error deleting user"})
    }
})


// Get admin route
router.get("/get-admin/:id", verifyAdmin, async(req, res) => {
    try {
        const admin = await User.findById(req.params.id)
        if(!admin) return res.status(400).json({message: "Admin not found"})
        
        // Deconstruct to omit password & the ._doc to omit unnecessary object data 
        const {password, ...info} = admin?._doc
        res.status(200).json({message: "User retrieved!", data:info})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error fetching admin"})
    }
})

export default router
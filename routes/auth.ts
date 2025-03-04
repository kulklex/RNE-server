import User from "../models/user.ts";
import express from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const router = express.Router()

// Register route
router.post("/register", async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        await newUser.save()

        // Destructuring to extract `password` and collect the rest into `info`
        const {password, ...info} = (newUser as any)._doc

        res.status(201).json({message: "User Created Successfully", data: info})
    } catch (error) {
        res.status(500).json({message: "Error Creating User", error})
    }
})


// Login Route
router.post("/login", async(req, res) => {
    try {
        const user:any = User.findOne({email: req.body.email})
        if (!user) {
            return res.status(404).json({message: "Invalid Credentials"})
        }

        const comparePassword:any = bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) {
            return res.status(404).json({message: "Invalid Credentials"})
        }

        const token = jwt.sign({userId: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET_KEY, {expiresIn: "5d"})
        const {password, ...info} = (user as any)._doc
        res.status(200).json({data: {...info, token}, message: "Login Successful"}) //Deconstruct to allow `token` as a parameter inside info object
    } catch (error) {
        res.status(500).json({message: "Error logging-in user"})
    }
})

export default router
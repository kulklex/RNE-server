import express from "express"
import Cart from "../models/cart.ts"
import { verifyToken } from "../middlewares/verifyToken.ts"

const router = express.Router()

// Create cart
router.post("/", verifyToken, async (req, res) => {
    try {
        const cart = new Cart(req.body)
        await cart.save()
        return res.status(201).json({message:"Cart created successfully", data: cart})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error creating cart"})
    }
})


// Fetch user cart item
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.id})
        if (!cart) res.status(404).send("Cart does not exist")
            
        res.status(200).json({message: "Cart fetched successfully", data: cart})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error fetching cart"})
    }
})


// Fetch cart items
router.get("/", verifyToken, async (req, res) => {
    try {
        const cart = await Cart.find()
        if (!cart) res.status(404).send("Cart does not exist")
            
        res.status(200).json({message: "Cart fetched successfully", data: cart})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error fetching cart"})
    }
})


// Update cart
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updatedProduct = await Cart.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json({message: "Cart updated successfully!", data: updatedProduct}) 
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error updating cart"})
    }
})


// Delete cart
router.delete("/delete/:id", verifyToken, async(req, res)=> {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Cart deleted successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error deleting cart"})
    }
})

export default router
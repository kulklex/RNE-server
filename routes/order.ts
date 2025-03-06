import express from "express"
import Order from "../models/order.ts"
import { verifyAdmin, verifyToken } from "../middlewares/verifyToken.ts"

const router = express.Router()

// Create order
router.post("/", verifyToken, async (req, res) => {
    try {
        const order = new Order(req.body)
        await order.save()
        return res.status(201).json({message:"Order created successfully", data: order})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error creating order"})
    }
})


// Fetch user order 
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const order = await Order.findOne({userId: req.params.id})
        if (!order) {
            return res.status(404).send("Order does not exist")
        }
            
        res.status(200).json({message: "Order fetched successfully", data: order})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error fetching order"})
    }
})


// Fetch orders 
router.get("/", verifyToken, async (req, res) => {
    try {
        const order = await Order.find()
        if (!order) {
            return res.status(404).send("Order does not exist")
        }
            
        res.status(200).json({message: "Order fetched successfully", data: order})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error fetching order"})
    }
})


// Update order
router.put("/:id", verifyAdmin, async (req, res) => {
    try {
        const updatedProduct = await Order.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        if (!updatedProduct) {
            return res.status(404).send("Order does not exist")
        }
        res.status(200).json({message: "Order updated successfully!", data: updatedProduct}) 
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error updating order"})
    }
})


// Delete order
router.delete("/delete/:id", verifyToken, async(req, res)=> {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Order deleted successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error deleting order"})
    }
})

// Get monthly income
router.get("/stats/monthly-income", verifyAdmin, async (req, res) => {
    try {
        const date = new Date()
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
        const previousMonth = new Date(new Date(lastMonth.setMonth(lastMonth.getMonth() - 1)))
        
        const monthlyIncome = await Order.aggregate([
            {$match: {createdAt: {$gte: previousMonth}}},
            {$project: {
                month: {$month: "$createdAt"},
                sales: "$amount"
            }},
            {$group: {
                _id: "$month",
                total: {$sum: "$sales"}
            }}
        ])
          
        res.status(200).json({message: "Order monthly income fetched successfully", data: monthlyIncome})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error fetching order monthly income"})
    }
})

export default router
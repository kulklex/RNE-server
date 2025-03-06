import express from "express"
import Product from "../models/product.ts"
import { verifyAdmin } from "../middlewares/verifyToken.ts"
import { parser } from "../utils/cloudinary.ts"

const router = express.Router()

// Create product
router.post("/", verifyAdmin, parser.single("image"), async (req, res) => {
    try {
        const categories = req.body.categories ? req.body.categories.split(",") : []
        const newProduct = new Product({...req.body, categories, image: req.file.path})
        await newProduct.save()
        return res.status(201).json({message:"Product created!", data:newProduct})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error creating product"})
    }
})


// Fetch all products
router.get("/", async (req, res) => {
    try {
        const queryByLatest = req.query.latest
        const queryByCategories = req.query.category
        
        let allProducts;
        if(queryByLatest) {
            allProducts =  await Product.find().sort({createdAt: -1}).limit(10)
        } else if (queryByCategories) {
            allProducts = await Product.find({categories: {
                $in: [queryByCategories]
            }})
        } else {
            allProducts = await Product.find()
        }
        res.status(200).json({message: "All products fetched successfully", data: allProducts})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error fetching all products"})
    }
})


// Fetch product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({message:"Product does not exist"})
        }
            
        res.status(200).json({message: "Product fetched successfully", data: product})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error fetching product"})
    }
})


// Update product
router.put("/:id", verifyAdmin, parser.single("image"), async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        if (!updatedProduct) {
            return res.status(404).json({message:"Product does not exist"})
        }
        res.status(200).json({message: "Product updated successfully!", data: updatedProduct}) 
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error updating product"})
    }
})


// Delete product
router.delete("/delete/:id", verifyAdmin, async(req, res)=> {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Product deleted successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error deleting product"})
    }
})

export default router
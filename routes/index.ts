import express from "express"
import userRouter from "./user.ts"
import authRouter from "./auth.ts"
import productRouter from "./product.ts"
import cartRouter from "./cart.ts"
import orderRouter from "./order.ts"

const router = express.Router()

const BASE = "/api/v1"

router.get(`/`, (req,res) => {
    res.status(200).json("APP IS RUNNING")
})

router.use(`${BASE}/user`, userRouter)
router.use(`${BASE}/auth`, authRouter)
router.use(`${BASE}/products`, productRouter)
router.use(`${BASE}/carts`, cartRouter)
router.use(`${BASE}/orders`, orderRouter)



export default router
import express from "express"
import userRouter from "./user.ts"
import authRouter from "./auth.ts"

const router = express.Router()

const BASE = "/api/v1"

router.get(`/`, (req,res) => {
    res.status(200).json("APP IS RUNNING")
})

router.use(`${BASE}/user`, userRouter)
router.use(`${BASE}/auth`, authRouter)




export default router
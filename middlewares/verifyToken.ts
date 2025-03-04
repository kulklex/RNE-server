import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) return res.status(401).send("Access Denied!")

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = verified
        next()
    } catch (error) {
        console.error(error)
        res.status(400).send("Invalid Token")
    }
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin) {
            next()
        } else {
            return res.status(500).send("Access Denied! User is not an admin")
        }
    })
}

export {verifyAdmin, verifyToken}
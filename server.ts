import express from "express"
import cors from "cors"

import connect from "./database/db.ts"
import routes from "./routes/index.ts"

// Initialize the Express app
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS

app.use("/", routes)


// Start the server
const Port:number = 3000
app.listen(Port, () => {
    console.log(`Server started on ${Port}`);
    connect()
});
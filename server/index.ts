import express, { Request, Response } from "express";
import {UserRepo} from "./data/repo/UserRepo";
import {newUser} from "./data/mock/newUser";
import {AppDataSource} from "./data/data-source";

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "Hello from TypeScript node. Change"
    })
})



// Init DataBase
if (!AppDataSource.isInitialized) {
    AppDataSource.initialize()
    console.log(`Initialize data base ${AppDataSource.options.database} `)
    if (!AppDataSource.isInitialized) {throw Error("Can't initialize database")}
}
// Test DB
const userRepo = new UserRepo()
userRepo.add(newUser)

const port = process.env.SERVER_PORT || 5000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
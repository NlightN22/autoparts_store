import {randomInt} from "crypto";

require('dotenv').config()


import {Request, Response} from "express";

const express = require('express')

import {PrismaClient, Prisma} from '@prisma/client'
import {handleDbErrors} from "./error/handleDbErrors";

const prisma = new PrismaClient()

const newUser = async () => {
    const data = {
        name: `Test${randomInt(1000)}`,
        email: `test1@mail.com`
    }
    try {
        console.log("Inserting a new user into the database...")
        await prisma.user.create({
            data
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            handleDbErrors(e, data)
        } else {
            console.error(e)
            throw e
        }
    }
}

const start = async () => {
    try {
        const app = express()
        const PORT = process.env.SERVER_PORT || 5000

        await newUser()

        app.get("/", async (req: Request, res: Response) => {
            console.log("Loading users from the database...")
            const users = await prisma.user.findMany()
            res.json(users)
        })

        app.get("/user/clear_all", async (req: Request, res: Response) => {
            console.log("Clear ALL users from database...")
            await prisma.user.deleteMany()
            res.json({result: "OK"})
        })

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

    } catch (e) {
        console.error(e)
    }
}

start()

import { Request, Response } from 'express'
import db from '../db/index.js'
import {users} from '../db/schema/users.js'
export async function getAllUsers(_: Request, res: Response){
    const all_users = await db.select().from(users)
    res.json({users: all_users})
}

export async function createUser(req: Request, res: Response){
    const {age, email, name} = req.body
    const create_user = await db.insert(users).values({age, email, name})
    res.status(201).json(create_user)
}
import express, { Response} from 'express'
import user_router from './routes/user.routes.js'
const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use('/users', user_router)

app.get('/', (_, res: Response) => {
    res.send("You've reached the root of the api")
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
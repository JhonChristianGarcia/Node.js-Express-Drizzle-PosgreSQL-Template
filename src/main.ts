import express, { Response} from 'express'
import user_router from './routes/user.routes'
import { configure } from '@codegenie/serverless-express'

const app = express()
// const PORT = process.env.PORT || 3000;

// @codegenie/serverless-express mocks the request socket without EventEmitter
// methods (.on/.removeListener). Express's default error/404 handler
// (finalhandler) attaches a 'close'/'error' listener to that socket before
// responding, which crashes with "ee.on is not a function" on unconsumed
// (e.g. bodyless GET) requests. Patch it in so that handler has something to call.
app.use((req, _res, next) => {
    const socket = req.socket as unknown as Record<string, unknown>
    if (socket && typeof socket.on !== 'function') {
        socket.on = () => socket
        socket.removeListener = () => socket
        socket.once = () => socket
    }
    next()
})

app.use(express.json())

app.use('/users', user_router)

app.get('/', (_, res: Response) => {
    res.send("You've reached the root of the api")
})

// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`)
// })

export const handler = configure({ app })
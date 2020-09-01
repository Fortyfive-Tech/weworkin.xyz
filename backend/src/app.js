/* eslint-disable no-console */
import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import profilesRoutes from './routes/profiles'

const app = express()

// Middleware
app.use(bodyParser.json())

// Routes
app.use('/profile', profilesRoutes)

app.get('/', (req, res) => {
    res.send('Incoming...')
})

const port = process.env.PORT ?? 3000
const server = app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on ${port}`)
})

process.on('SIGTERM', () => {
    setTimeout(() => {
        server.close(() => {
            console.log('HTTP server closed')
        })
    }, 1000)
})

import express from 'express'
import ViteExpress from 'vite-express'
import morgan from 'morgan'

// Set up an express instance called "app"
const app = express()

// Set up middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(express.json()) 

//Import handler functions
import handlerFunctions from './controller.js'

// Routes go here
app.get('/invoices', handlerFunctions.getInvoices)
app.post('/addInvoice', handlerFunctions.addInvoice)
app.delete('/deleteInvoice/:id', handlerFunctions.deleteInvoice)
app.put('/editInvoice/:id', handlerFunctions.editInvoice)

// Open up a door to the server
ViteExpress.listen(app, 2319, () => console.log('bienvenidos a http://localhost:2319'))
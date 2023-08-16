require('dotenv').config()
const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

// routes
app.get('/', (req,res)=>{
    return res.status(200).send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter)

// middleware
app.use(express.json());
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//routes

const port = process.env.PORT || 3000

const start = async ()=>{
    try {
        // connect to DB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()
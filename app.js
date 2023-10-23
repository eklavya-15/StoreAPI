require('dotenv').config();

const express = require('express');
const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');


const app = express();
const productsRouter = require('./routes/products');


app.use(express.json());
app.use('/api/v1/products',productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`Server is listening on the port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();
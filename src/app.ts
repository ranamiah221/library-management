import express, { Application } from 'express';
import { bookRoutes } from './app/controllers/book.controllers';
import { borrowRoutes } from './app/controllers/borrow.controllers';
import { errorHandler } from './app/errorHandler/error.handler';
import cors from 'cors';
const app:Application=express();

app.use(express.json())
app.use(cors({
    origin:['https://library-management-client-kappa-three.vercel.app']
}))

app.use('/api/books', bookRoutes)
app.use('/api/borrow', borrowRoutes)


app.get('/', async(req, res)=>{
    res.send('Welcome To Library Management System')
})
app.use(errorHandler)

export default app;


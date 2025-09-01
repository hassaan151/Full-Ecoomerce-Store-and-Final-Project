import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import dotenv from 'dotenv';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());


// API Routes
app.use('/api/user', userRouter);

app.use('/api/product', productRouter);

app.use('/api/cart' , cartRouter)

app.use('/api/order',orderRouter)


app.get('/', (req, res) => {
  res.send('API WORKING');
});

app.listen(port, () => console.log(`Server started on PORT: ${port}`));

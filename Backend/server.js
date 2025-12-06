import express from 'express';
import dummyRoute from './routes/dummyRoute.js'
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(cors({
    origin: ['http://localhost:3000', 'https://yourdomain.com'], 
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
  }));

app.use('/', dummyRoute);

// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
// });

app.listen(process.env.PORT || 5000);
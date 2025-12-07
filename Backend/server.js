import dotenv from 'dotenv';
dotenv.config({ debug: false });

import express from 'express';
import dummyRoute from './routes/dummyRoute.js'
import sequelize from './config/sequelizeConfig.js';
import cors from 'cors';
import categoryRoute from './routes/categoryRoute.js';
import errorHandler from './middleware/errorHandler.js';
import userRoute from './routes/userRoute.js';
import { setupAssociations } from './models/associations.js';
import productRoute from './routes/productRoute.js';

const app = express();

// Set up model associations here — before DB connection
setupAssociations();

app.use(cors({
    origin: ['http://localhost:3000', 'https://yourdomain.com'], 
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

app.use('/', dummyRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);
app.use('/products', productRoute);

app.use(errorHandler);

// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
// });

app.listen(process.env.PORT || 5000);
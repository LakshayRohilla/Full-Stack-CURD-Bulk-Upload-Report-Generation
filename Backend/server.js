import express from 'express';
import dummyRoute from './routes/dummyRoute.js'

const app = express();

app.use('/', dummyRoute);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
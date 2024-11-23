import express from 'express';
import morgan from 'morgan';
import { authenticateToken } from './middlewares/authenticate.middleware.js';
//Routes 
import userRoutes from  './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js'; 
import tasksRoutes from './routes/tasks.routes.js';


const app = express();

//Midleweares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/login', authRoutes);  
app.use('/api/users', userRoutes);
app.use('/api/tasks', authenticateToken, tasksRoutes);

export default app;
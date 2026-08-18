import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

// Middleware bawaan
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// VULNERABILITY FIXED: CORS diaktifkan HANYA untuk origin yang dipercaya
// dan credentials diizinkan agar cookie bisa dikirim.
app.use(cors({ 
    origin: 'http://localhost:5173', 
    credentials: true 
}));

app.use('/', routes);

export default app;

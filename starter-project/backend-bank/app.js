import express from 'express';
import cookieParser from 'cookie-parser';
// TODO 1 (CORS): Import library 'cors' di sini
// import cors from 'cors';
import routes from './routes/index.js';

const app = express();

// Middleware bawaan
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// TODO 1 (CORS): Gunakan middleware cors di sini agar Frontend Bank (localhost:5173) diizinkan mengakses API ini.
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/', routes);

export default app;

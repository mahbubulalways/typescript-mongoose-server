// const express = require('express')
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRoute } from './app/modules/students/student.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

//  applications routes are here

app.use('/api/v1/students/', studentRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('this server is ready to start');
});
app.get('/products', (req: Request, res: Response) => {
  res.send('all  products are here');
});

export default app;
import express from 'express';
import cors from 'cors';
import ordersRouter from './routes/orders.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/orders', ordersRouter);

app.get('/', (_, res) => {
  res.send('API is live!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

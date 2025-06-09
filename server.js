require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const Worker = mongoose.model('Worker', new mongoose.Schema({
  name: String,
  role: String,
  rate: Number
}));

const Payment = mongoose.model('Payment', new mongoose.Schema({
  worker: String,
  hours: Number,
  amount: Number,
  status: String
}));

app.get('/api/workers', async (req, res) => {
  const workers = await Worker.find();
  res.json(workers);
});

app.post('/api/workers', async (req, res) => {
  const worker = new Worker(req.body);
  await worker.save();
  res.status(201).json(worker);
});

app.get('/api/payments', async (req, res) => {
  const payments = await Payment.find();
  res.json(payments);
});

app.post('/api/payments', async (req, res) => {
  const payment = new Payment(req.body);
  await payment.save();
  res.status(201).json(payment);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

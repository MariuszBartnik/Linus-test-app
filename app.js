const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const investmentRoutes = require('./routes/investmentRoutes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

app.use('/api', investmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT)
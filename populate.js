require('dotenv').config();

const connectDB = require('./db/connect');

const Product = require('./models/product');
const products = require('./products.json');
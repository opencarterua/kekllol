import express, { json } from 'express';
import { Product } from '../models/productModel.js';

const router = express.Router();

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const products = await Product.find({});

    // return response.status(200).json({
    //   count: products.length,
    //   data: products,
    // });

    return response.status(200).json(products);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;

import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    rating: Number,
    category: String,
  });
  const Products = mongoose.model('Products', ProductSchema);
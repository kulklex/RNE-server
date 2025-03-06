import mongoose, { Document, Schema } from 'mongoose';

interface Product extends Document {
  title: string;
  desc: string;
  image: string;
  categories: string[];
  size?: string;
  colour?: string;
  price?: Number;
}

const productSchema = new Schema<Product>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
    },
    desc: {
      type: String,
      required: [true, 'Description is required'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    categories: {
      type: [String],
      default: [],
    },
    size: {
      type: String,
    },
    colour: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<Product>('Product', productSchema);

export default Product;

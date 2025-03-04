import mongoose, { Document, Schema } from 'mongoose';

interface Product extends Document {
  title: string;
  desc: string;
  Image: string;
  categories: string[];
  size?: string;
  colour?: string;
  price?: string;
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
    Image: {
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
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<Product>('Product', productSchema);

export default Product;

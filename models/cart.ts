import mongoose from "mongoose";

interface Product {
  productId: string;
  quantity: number;
}

interface Cart extends mongoose.Document {
  userId: string;
  product: Product[];
  amount: number;
  address: Record<string, unknown>;
  status: string;
}

const cartSchema = new mongoose.Schema<Cart>(
  {
    userId: {
      type: String,
      required: [true, 'UserID is required'],
    },
    product: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    address: {
      type: Object,
      required: [true, 'Address is required'],
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model<Cart>('Cart', cartSchema);

export default Cart;

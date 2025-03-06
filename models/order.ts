import mongoose from "mongoose";

interface Product {
  productId: string;
  quantity: number;
}

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Order extends mongoose.Document {
  userId: string;
  products: Product[];
  amount: number;
  address: Address;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod: "card" | "bank_transfer" | "paypal" ;
  orderDate: Date;
  deliveryDate?: Date;
  trackingId?: string;
}

const orderSchema = new mongoose.Schema<Order>(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
    },
    products: [
      {
        productId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    address: {
      street: { type: String, required: [true, "Street is required"] },
      city: { type: String, required: [true, "City is required"] },
      state: { type: String, required: [true, "State is required"] },
      postalCode: { type: String, required: [true, "Post Code is required"] },
      country: { type: String, required: [true, "Country is required"] }
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "bank_transfer", "paypal", "crypto"],
      required: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    deliveryDate: {
      type: Date,
    },
    trackingId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<Order>("Order", orderSchema);

export default Order;

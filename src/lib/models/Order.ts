import mongoose, { Schema, model, models } from "mongoose";

const OrderItemSchema = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  selectedMg: { type: String },
  quantity: { type: Number, required: true },
  itemRate: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String }
});

const OrderSchema = new Schema({
  userEmail: {
    type: String,
    required: [true, "User email is required"],
    lowercase: true,
    trim: true,
  },
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
  },
  items: [OrderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    default: "pending",
    enum: ["pending", "completed", "cancelled"]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent cached schemas in Next.js development hot-reloads from stripping new fields
if (mongoose.models && mongoose.models.Order) {
  delete (mongoose as any).models.Order;
}

const Order = models.Order || model("Order", OrderSchema);

export default Order;

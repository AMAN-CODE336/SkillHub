import { razorpayInstance } from "../utils/razorpay.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to create order" });
  }
};

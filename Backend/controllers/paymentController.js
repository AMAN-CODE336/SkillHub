import { razorpayInstance } from "../utils/razorpay.js";
import crypto from "crypto";
import Enrollment from "../models/Enrollment.js"
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount, // ✅ already in paise
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



export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = req.body;

    // 1. Create signature on backend
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    // 2. Compare signatures
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // 3. Enroll user after successful payment
    const alreadyEnrolled = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (!alreadyEnrolled) {
      await Enrollment.create({
        user: req.user._id,
        course: courseId,
      });
    }

    res.json({
      message: "Payment verified & course enrolled successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Payment verification error" });
  }
};
import axiosClient from "../api/axiosClient";

export function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function openRazorpayCheckout({
  orderId,
  amount,
  currency,
  user,
  courseId,
  onSuccess
}) {
  const isLoaded = await loadRazorpay();
  if (!isLoaded) {
    alert("Razorpay SDK failed to load");
    return;
  }

  const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
  if (!key) {
    alert("Razorpay key missing");
    return;
  }

  const options = {
    key,
    amount,
    currency,
    order_id: orderId,
    name: "SkillHub",
    description: "Course Enrollment",
    prefill: {
      name: user?.name || "",
      email: user?.email || ""
    },
    theme: {
      color: "#2563eb"
    },

    handler: async function (response) {
      try {


        // 🔥 VERIFY PAYMENT
        await axiosClient.post("/payment/verify", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          courseId: courseId,
          });

        alert("Payment verified & course enrolled!");
onSuccess();

      } catch (err) {
  console.error("VERIFY ERROR:", err.response?.data || err.message);
  alert(err.response?.data?.message || "Payment verification failed");
}

    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}

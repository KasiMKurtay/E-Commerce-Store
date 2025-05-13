import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { ArrowRight, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
  "pk_test_51RMGsYRHxP8Pg9eIn6MXeIdm5rE9npEMZ76g4yDUyQe0KRzbFmdMH3GUG2NKZGFA0VMsvFdafIXwGUvirM6QZhZ000hq0QGxNB"
);

const OrderSummary = () => {
  const {
    total,
    subTotal,
    coupon,
    isCouponApplied,
    applyCoupon,
    cart,
    getCoupon,
    removeCoupon,
  } = useCartStore();

  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState("");

  const savings = subTotal - total;
  const formattedSubTotal = Number(subTotal).toFixed(2);
  const formattedTotal = Number(total).toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    try {
      const res = await axios.post("/payments/create-checkout-session", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });
      const session = res.data;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        console.error("Stripe error", result.error.message);
      }
    } catch (err) {
      console.error("Checkout error", err);
    }
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode) return;

    setIsApplying(true);
    const normalizedCode = couponCode.trim().toUpperCase();
    const result = await applyCoupon(normalizedCode);

    if (!result) {
      setError("Geçersiz kupon kodu.");
    } else {
      setError("");
    }

    setIsApplying(false);
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setCouponCode("");
    setError("");
  };

  useEffect(() => {
    getCoupon();
  }, [getCoupon]);

  useEffect(() => {
    if (coupon) {
      setCouponCode(coupon.code);
    }
  }, [coupon]);

  return (
    <motion.div
      className="space-y-6 rounded-xl border border-gray-700 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 shadow-xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">
        Order Summary
      </h2>

      <div className="space-y-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Subtotal</span>
            <span className="font-medium text-white">${formattedSubTotal}</span>
          </div>

          {savings > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Discounts</span>
              <span className="font-medium text-emerald-400">
                -${formattedSavings}
              </span>
            </div>
          )}

          {coupon && isCouponApplied && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-gray-400">
                <Tag className="h-4 w-4" />
                <span>Coupon ({coupon.code})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-emerald-400">
                  -{coupon.discountPercentage}%
                </span>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-xs text-red-400 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          <div className="border-t border-gray-700 pt-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Total</span>
              <span className="text-xl font-bold text-emerald-400">
                ${formattedTotal}
              </span>
            </div>
          </div>
        </div>

        {!isCouponApplied && (
          <form onSubmit={handleApplyCoupon} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon code"
                className="flex-1 rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <motion.button
                type="submit"
                className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 disabled:opacity-50"
                whileTap={{ scale: 0.95 }}
                disabled={!couponCode || isApplying}
              >
                {isApplying ? "Applying..." : "Apply"}
              </motion.button>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </form>
        )}

        <motion.button
          className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-emerald-600 px-6 py-3 font-medium text-white shadow-lg hover:from-purple-500 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-800"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </motion.button>

        <div className="flex items-center justify-center gap-2 pt-2">
          <Link
            to="/"
            className="group inline-flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;

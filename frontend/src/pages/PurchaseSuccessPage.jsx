import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";

const PurchaseSuccessPage = () => {
  const [isProcess, setIsProcess] = useState(true);
  const { clearCart } = useCartStore();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCheckout = async (sessionId) => {
      try {
        await axios.post("/payments/checkout-success", { sessionId });
        clearCart();
      } catch (error) {
        console.log(error);
      } finally {
        setIsProcess(false);
      }
    };
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      handleCheckout(sessionId);
    } else {
      setIsProcess(false);
      setError("Session ID not found");
    }
  }, [clearCart]);

  if (isProcess) return "Proccessing..";

  if (error) return error;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="max-w-md w-full rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-[#0f0f0f] shadow-2xl overflow-hidden relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-700/20 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-500/20 rounded-full filter blur-3xl"></div>

        <div className="p-8 sm:p-10 relative z-10">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0.8, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
            }}
          >
            <CheckCircle className="text-emerald-400 size-20 stroke-[1.5]" />
          </motion.div>

          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400 mb-3">
              Payment Confirmed
            </h1>
            <p className="text-gray-400 font-light">
              Your order is being prepared. We'll notify you when it ships.
            </p>
          </div>

          <motion.div
            className="bg-gray-800/60 border border-gray-700 rounded-xl p-5 mb-8 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                <span className="text-gray-400 font-medium">Order Number</span>
                <span className="font-medium text-purple-300">
                  #ORD-{Math.floor(Math.random() * 90000) + 10000}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Amount</span>
                <span className="font-medium text-white">
                  ${(Math.random() * 200 + 50).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Payment Method</span>
                <span className="font-medium text-emerald-300">
                  Credit Card
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                <span className="text-gray-400">Delivery Estimate</span>
                <span className="font-medium text-emerald-400">
                  {new Date(
                    Date.now() + 3 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="space-y-3">
            <motion.button
              whileHover={{
                scale: 1.02,
                background: "linear-gradient(135deg, #8B5CF6 0%, #10B981 100%)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-600 to-emerald-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-purple-500/30"
            >
              <HandHeart className="mr-2" size={18} />
              View Order Details
            </motion.button>

            <Link to="/" className="block">
              <motion.button
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-800/80 hover:bg-gray-700/90 text-gray-300 font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center border border-gray-700"
              >
                Continue Shopping
                <ArrowRight className="ml-2" size={18} />
              </motion.button>
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need assistance?
              <span className="text-purple-400 hover:text-purple-300 cursor-pointer transition-colors">
                Contact our support team
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseSuccessPage;

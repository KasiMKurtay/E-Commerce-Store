import { ArrowLeft, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-12">
      <motion.div
        className="max-w-md w-full rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-[#0f0f0f] shadow-2xl overflow-hidden relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-red-500/10 rounded-full filter blur-3xl"></div>

        <div className="p-8 sm:p-10 relative z-10">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0.8, rotate: 15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
            }}
          >
            <XCircle className="text-red-500 size-20 stroke-[1.5]" />
          </motion.div>

          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-400 mb-3">
              Payment Canceled
            </h1>
            <p className="text-gray-400 font-light">
              The payment process was interrupted. No charges were made.
            </p>
          </div>

          <motion.div
            className="bg-gray-800/60 border border-gray-700 rounded-xl p-5 mb-8 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Order Status</span>
                <span className="font-medium text-red-400">Canceled</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Reason</span>
                <span className="font-medium text-purple-300">
                  User Cancelled
                </span>
              </div>
            </div>
          </motion.div>

          <div className="space-y-3">
            <Link to="/" className="block">
              <motion.button
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(55, 65, 81, 0.9)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-800/80 hover:bg-gray-700/90 text-purple-300 font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center border border-purple-500"
              >
                <ArrowLeft className="mr-2" size={18} />
                Return to Homepage
              </motion.button>
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Think this was a mistake?{" "}
              <Link
                to="/support"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseCancelPage;

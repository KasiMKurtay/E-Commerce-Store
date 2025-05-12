import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <motion.div
      className="rounded-xl border p-6 shadow-lg border-gray-700 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <div className="shrink-0 md:order-1">
          <img
            className="h-20 w-20 md:h-28 md:w-28 rounded-lg object-cover border border-gray-700 shadow-sm"
            src={item.image}
            alt={item.name}
          />
        </div>

        <div className="w-full min-w-0 flex-1 space-y-3 md:order-2 md:max-w-md">
          <h3 className="text-lg font-semibold text-white hover:text-purple-400 transition-colors">
            {item.name}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center gap-4 pt-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
              onClick={() => removeFromCart(item._id)}
            >
              <Trash className="h-4 w-4" />
              <span>Remove</span>
            </motion.button>
          </div>
        </div>

        <div className="flex items-center justify-between md:order-3 md:flex-col md:items-end md:gap-4">
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border
                         border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none 
                         focus:ring-2 focus:ring-purple-500/50 transition-all"
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3 text-gray-300" />
            </motion.button>

            <span className="min-w-[20px] text-center font-medium text-white">
              {item.quantity}
            </span>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border
                         border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none 
                         focus:ring-2 focus:ring-purple-500/50 transition-all"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3 text-gray-300" />
            </motion.button>
          </div>

          <div className="text-end">
            <p className="text-lg font-bold text-purple-400">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-gray-400">${item.price} each</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;

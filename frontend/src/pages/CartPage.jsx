import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
  import OrderSummary from "../components/OrderSummary";
import RecItems from "../components/RecItems";

const CartPage = () => {
  const { cart } = useCartStore();

  return (
    <div className="py-8 md:py-12 text-white min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h1 className="text-3xl md:text-4xl text-center font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
          Your Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          <motion.div
            className="w-full lg:w-2/3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}
          </motion.div>

          {cart.length > 0 && (
            <motion.div
              className="w-full lg:w-1/3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="sticky top-4">
                <OrderSummary />
              </div>
            </motion.div>
          )}
        </div>

        {cart.length > 0 && (
          <motion.div
            className="mt-16 w-full lg:w-3/3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            </h2>
            <RecItems products={cart} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

const EmptyCartUI = () => (
  <motion.div
    className="flex flex-col items-center justify-center space-y-6 py-16 text-center rounded-xl border border-gray-800 bg-gradient-to-br "
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
  >
    <div className="p-6 rounded-full bg-gray-900/50 border border-gray-800">
      <ShoppingCart className="size-16 text-purple-500" />
    </div>
    <h3 className="text-2xl font-bold text-white">Your cart feels lonely</h3>
    <p className="text-gray-400 max-w-md text-sm md:text-base">
      Your shopping adventure awaits! Add some items to get started.
    </p>
    <Link
      to="/"
      className="mt-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 text-white font-medium hover:from-purple-500 hover:to-pink-400 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
    >
      Explore Products
    </Link>
  </motion.div>
);

import { ShoppingCart } from "lucide-react";
import React from "react";
import { useUserStore } from "../stores/useUserStore";
import { toast } from "react-hot-toast";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("You must be logged in to add to cart", { id: "login" });
      return;
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-lg transition-all hover:shadow-xl hover:shadow-purple-900/10">
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900/90" />
      </div>

      <div className="p-4 pt-3">
        <h3 className="text-lg font-bold text-white line-clamp-1">
          {product.name}
        </h3>

        <div className="mt-3 flex items-end justify-between">
          <p className="text-2xl font-bold text-purple-400">${product.price}</p>
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 font-medium text-white transition-all hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-700/30 active:scale-95"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

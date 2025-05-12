import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const RecItems = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecItems = async () => {
      try {
        const res = await axios.get("/products/recommendations");
        setRecommendations(res.data);
      } catch (error) {
        toast.error(error.response.data.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecItems();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-end justify-between mb-8">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">
          Complete Your Collection
        </h3>
        <Link
          to="/products"
          className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white transition-colors"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <motion.div
            key={product.id}
            className="group rounded-xl border border-gray-700 bg-gradient-to-br from-gray-800/50 to-gray-900/50 overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all"
            whileHover={{ y: -5 }}
          >
            <Link to={`/product/${product.id}`}>
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-4">
                <span className="text-xs font-medium text-purple-400">
                  {product.category}
                </span>
                <h4 className="mt-1 text-lg font-semibold text-white line-clamp-1">
                  {product.name}
                </h4>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-300">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-emerald-400">
                    ${product.price}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecItems;

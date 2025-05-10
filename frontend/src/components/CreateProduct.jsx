import { motion } from "framer-motion";
import { Loader, PlusCircle, Upload } from "lucide-react";
import { useState, useRef } from "react";
import { useProductStore } from "../stores/useProductStore";
import toast from "react-hot-toast";

const categories = [
  "jeans",
  "tshirts",
  "jacket",
  "glasses",
  "shoes",
  "suits",
  "bag",
];

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef(null);

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
      });
      setPreviewImage("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  return (
    <motion.div
      className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl p-6 md:p-8 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <div className="mb-8">
        <motion.h2
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Create New Product
        </motion.h2>
        <p className="text-gray-400 mt-2">
          Fill out the form to add a new product
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
            placeholder="Enter product name"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
            placeholder="Enter product description"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Price ($)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              $
            </span>
            <input
              type="number"
              id="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="w-full pl-8 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-200"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Product Image
          </label>
          <input
            type="file"
            id="image"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
            required
          />
          <div
            onClick={triggerFileInput}
            className="border-2 border-dashed border-gray-600/50 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500/50 transition-colors duration-200"
          >
            {previewImage ? (
              <div className="flex flex-col items-center">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-md mb-2"
                />
                <span className="text-sm text-gray-400">
                  {loading ? "Uploading...  " : "Change"}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-gray-400">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF (MAX. 5MB)
                </p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="pt-2"
        >
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 rounded-lg font-medium shadow-lg transition-all duration-300 flex items-center justify-center ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
            }`}
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5 mr-2" />
                Create Product
              </>
            )}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default CreateProduct;

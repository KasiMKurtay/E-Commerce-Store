import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Analytics from "../components/Analytics";
import ListOfProducts from "../components/ListOfProducts";
import CreateProduct from "../components/createProduct";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
  { id: "analytics", label: "Analytics", icon: BarChart },
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("analytics");

  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="min-h-screen rounded-md bg-gradient-to-br from-gray-950 to-gray-900 text-white relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-12 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          Admin Dashboard
        </motion.h1>
        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "text-white bg-purple-500"
                  : "text-gray-400 bg-gray-800"
              } hover:bg-purple-600 hover:text-white`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-6 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg"
        >
          {activeTab === "analytics" && <Analytics />}
          {activeTab === "create" && <CreateProduct />}
          {activeTab === "products" && <ListOfProducts />}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;

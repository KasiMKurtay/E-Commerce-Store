import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-gray-400">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          color="from-purple-500 to-purple-700"
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
          icon={Package}
          color="from-emerald-500 to-emerald-700"
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
          color="from-cyan-500 to-cyan-700"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`$${analyticsData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="from-amber-500 to-amber-700"
        />
      </div>

      <motion.div
        className="bg-gray-800/60 rounded-xl border border-gray-700 p-6 shadow-xl backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <h3 className="text-xl font-semibold text-white mb-6">Sales Performance</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={dailySalesData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF"
              tick={{ fill: '#D1D5DB' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#D1D5DB' }}
            />
            <Tooltip 
              contentStyle={{
                background: '#1F2937',
                borderColor: '#374151',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#colorSales)"
              name="Sales"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              name="Revenue ($)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className={`rounded-xl border border-gray-700 p-6 shadow-lg overflow-hidden relative bg-gradient-to-br ${color}/20 backdrop-blur-sm`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -5 }}
  >
    <div className="relative z-10">
      <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-white text-2xl font-bold">{value}</h3>
    </div>
    <div className={`absolute -bottom-4 -right-4 opacity-20 text-7xl ${color.split(' ')[0]}`}>
      <Icon className="h-24 w-24" />
    </div>
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`} />
  </motion.div>
);

export default AnalyticsTab;
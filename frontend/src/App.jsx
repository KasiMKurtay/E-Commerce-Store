import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import LoadingSpinner from "./components/LoadingSpinner";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";

const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.05)_0%,transparent_70%)]" />
      <div className="fixed top-0 left-0 w-64 h-64 bg-purple-600/10 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <Navbar />
        <main className="pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/signup"
              element={!user ? <SignUpPage /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to="/" />}
            />

            <Route
              path="/dashboard"
              element={
                user?.role === "admin" ? <AdminPage /> : <Navigate to="/" />
              }
            />
            <Route path="/category/:category" element={<CategoryPage />} />
          </Routes>
        </main>
      </div>

      <Toaster />
    </div>
  );
};

export default App;

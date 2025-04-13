import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { useUser } from "@/Hooks/useUser";
import { Loader2 } from "lucide-react";

const ProtectedRoute = () => {
  const { isAuthenticated, checkAuth } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth(); // ✅ Check if the user session is valid
      setLoading(false);
    };

    verifyAuth();
  }, [checkAuth]);

  if (loading)
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-muted-foreground">
      <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
      <h2 className="text-lg font-semibold">Please wait...</h2>
      <p className="text-sm mt-1">Loading content, just a moment.</p>
    </div>; // ✅ Show loading state while checking

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

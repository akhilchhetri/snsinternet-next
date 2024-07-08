// components/ProtectedRoute.js
// @ts-nocheck
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useApp } from '../lib/appContext';

const ProtectedRoute = ({ children }) => {
  const { authToken, loading } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!authToken) {
      router.push("/auth/signin");
    }
  }, [authToken]);



//   return authToken ? children : null;
    return children
};

export default ProtectedRoute;

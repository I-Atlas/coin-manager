import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";
import { useAuth } from "./contexts/AuthContext";
import { AuthPage } from "./pages/Auth.page";
import { HomePage } from "./pages/Home.page";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
}

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

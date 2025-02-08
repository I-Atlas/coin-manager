import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";
import { useAuth } from "./contexts/AuthContext";
import { AuthPage } from "./pages/Auth.page";
import { EmailConfirmationPage } from "./pages/EmailConfirmation.page";
import { HomePage } from "./pages/Home.page";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (!user.email_confirmed_at) {
    return <Navigate to="/confirm-email" />;
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
        <Route path="/confirm-email" element={<EmailConfirmationPage />} />
      </Routes>
    </Router>
  );
}

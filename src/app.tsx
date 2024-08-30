import { OwnerProvider } from "./hooks/owner";
import { AuthProvider } from "./context/AuthContext";
import Routes from "./routes";

export function App() {
  return (
    <OwnerProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </OwnerProvider>
  );
}

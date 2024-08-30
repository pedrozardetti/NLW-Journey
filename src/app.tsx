
import { OwnerProvider } from "./context/owner";
import { TripProvider } from "./context/trip";
import Routes from "./routes";

export function App() {
  return (
    <OwnerProvider>
      <TripProvider>
        <Routes />
      </TripProvider>
    </OwnerProvider>
  );
}

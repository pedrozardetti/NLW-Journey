import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login/login";
import { Home } from "./pages/home/home";
import { Signup } from "./pages/signup/sign-up";
import { CreateTrip } from "./pages/new-trip/create-trip";
import { TripDetailsPage } from "./pages/trip/trip-details";
import { AuthOwnerProvider } from "./hooks/owner";

export function App() {
  return (
    <AuthOwnerProvider>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/trips/:tripId" element={<TripDetailsPage />} />
        </Routes>
      </Router>
    </AuthOwnerProvider>
  );
}

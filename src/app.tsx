import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/login";
import { Home } from "./components/home";
import { Signup } from "./components/sign-up";
import { CreateTrip } from "./components/create-trip";
import { TripDetailsPage } from "./components/trip-details";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/trip-details" element={<TripDetailsPage />} />
      </Routes>
    </Router>
  );
}

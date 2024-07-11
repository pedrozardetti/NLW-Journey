import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./login";
import { Home } from "./home";
import { Signup } from "./sign-up";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        
      </Routes>
    </Router>
  );
}

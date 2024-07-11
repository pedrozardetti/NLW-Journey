import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./login";
import { Home } from "./home";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </Router>
  );
}

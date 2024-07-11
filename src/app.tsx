import { Route, Routes } from "react-router-dom";
import { Login } from "./login";
import { Home } from "./home";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
  );
}

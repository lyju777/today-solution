import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Solution from "./pages/Solution";
import NotFound from "./pages/NotFound";

// 1. "/" 메인 홈페이지
// 2. "/solution" 솔루션 페이지
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/solution" element={<Solution />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

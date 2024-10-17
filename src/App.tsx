import "./App.css";

import { useState, useEffect, createContext } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./util/theme";
import Header from "./components/Header";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Solution from "./pages/Solution";
import NotFound from "./pages/NotFound";

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const context = createContext<ThemeContextType | undefined>(undefined);

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = sessionStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    sessionStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // 1. "/" 메인 홈페이지
  // 2. "/solution" 솔루션 페이지
  return (
    <>
      <context.Provider value={{ darkMode, setDarkMode }}>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solution" element={<Solution />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </context.Provider>
    </>
  );
};

export default App;

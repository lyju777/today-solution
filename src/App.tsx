import { useState, useEffect, createContext } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./util/theme";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Solution from "./pages/Solution";
import NotFound from "./pages/NotFound";
import Record from "./pages/Record";
import Edit from "./pages/Edit";
import RecordList from "./pages/RecordList";

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
  // 3. "/record" 기록하기 페이지
  // 4. "/edit/:id" 기록 수정 페이지
  // 5. "/recordlist" 기록 리스트 페이지
  return (
    <>
      <context.Provider value={{ darkMode, setDarkMode }}>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solution" element={<Solution />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/record" element={<Record />} />
            <Route path="edit/:id" element={<Edit />} />
            <Route path="/recordlist" element={<RecordList />} />
          </Routes>
        </ThemeProvider>
      </context.Provider>
    </>
  );
};

export default App;

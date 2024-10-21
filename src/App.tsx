import { useState, useEffect, createContext, useReducer } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./util/theme";
import { Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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

interface RecordStateContextType {
  data: object[];
}

interface RecordDispatchContextType {
  onCreate: (recordDate: Date | string, recordContent: string) => void;
}

interface State {
  id: string;
  recordDate: Date | string;
  recordContent: string;
}

type Action = { type: "INIT"; data: State[] } | { type: "CREATE"; data: State };

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
export const RecordStateContext = createContext<
  RecordStateContextType | undefined
>(undefined);

export const RecordDispatchContext = createContext<
  RecordDispatchContextType | undefined
>(undefined);

const reducer = (state: State[], action: Action) => {
  let nextState;
  switch (action.type) {
    case "INIT": {
      return action.data;
    }

    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("record", JSON.stringify(nextState));
  return nextState;
};

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = sessionStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [data, dispatch] = useReducer(reducer, []);
  const uuid = uuidv4();

  useEffect(() => {
    sessionStorage.setItem("darkMode", JSON.stringify(darkMode));

    const stroedData = localStorage.getItem("record");
    const parsedData = stroedData ? JSON.parse(stroedData) : [];

    dispatch({
      type: "INIT",
      data: parsedData,
    });
  }, [darkMode]);

  //-------------------------- reducer 함수 정의 --------------------------

  // 기록하기
  const onCreate = (recordDate: Date | string, recordContent: string) => {
    dispatch({
      type: "CREATE",
      data: { id: uuid, recordDate, recordContent },
    });
  };

  // 1. "/" 메인 홈페이지
  // 2. "/solution" 솔루션 페이지
  // 3. "/record" 기록하기 페이지
  // 4. "/edit/:id" 기록 수정 페이지
  // 5. "/recordlist" 기록 리스트 페이지
  return (
    <>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <RecordStateContext.Provider value={{ data }}>
            <RecordDispatchContext.Provider value={{ onCreate }}>
              <CssBaseline />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/solution" element={<Solution />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/record" element={<Record />} />
                <Route path="edit/:id" element={<Edit />} />
                <Route path="/recordlist" element={<RecordList />} />
              </Routes>
            </RecordDispatchContext.Provider>
          </RecordStateContext.Provider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default App;

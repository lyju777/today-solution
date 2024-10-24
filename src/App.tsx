import { useState, useEffect, createContext, useReducer } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./util/theme";
import { Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  InitRecord,
  Action,
  ThemeContextType,
  RecordStateContextType,
  RecordDispatchContextType,
} from "./types/types";

import Home from "./pages/Home";
import Solution from "./pages/Solution";
import NotFound from "./pages/NotFound";
import Record from "./pages/Record";
import Edit from "./pages/Edit";
import RecordList from "./pages/RecordList";
import Detail from "./pages/Detail";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
export const RecordStateContext = createContext<
  RecordStateContextType[] | undefined
>(undefined);

export const RecordDispatchContext = createContext<
  RecordDispatchContextType | undefined
>(undefined);

const reducer = (state: InitRecord[], action: Action) => {
  let nextState;
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
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
  const onCreate = (
    recordDate: Date,
    recordContent: string,
    recordTitle: string
  ) => {
    dispatch({
      type: "CREATE",
      data: { id: uuid, recordDate, recordContent, recordTitle },
    });
  };

  // 기록수정
  const onUpdate = (
    id: string,
    recordDate: Date,
    recordContent: string,
    recordTitle: string
  ) => {
    dispatch({
      type: "UPDATE",
      data: { id, recordDate, recordContent, recordTitle },
    });
  };

  // 기록삭제
  const onDelete = (id: string) => {
    dispatch({ type: "DELETE", id });
  };

  // 1. "/" 메인 홈페이지
  // 2. "/solution" 솔루션 페이지
  // 3. "/record" 기록하기 페이지
  // 4. "/edit/:id" 기록 수정 페이지
  // 5. "/recordlist" 기록 리스트 페이지
  // 6. "/detail/:id 기록 상세 페이지
  return (
    <>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <RecordStateContext.Provider value={data}>
            <RecordDispatchContext.Provider
              value={{ onCreate, onUpdate, onDelete }}
            >
              <CssBaseline />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/solution" element={<Solution />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/record" element={<Record />} />
                <Route path="edit/:id" element={<Edit />} />
                <Route path="/recordlist" element={<RecordList />} />
                <Route path="/detail/:id" element={<Detail />} />
              </Routes>
            </RecordDispatchContext.Provider>
          </RecordStateContext.Provider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
};

export default App;

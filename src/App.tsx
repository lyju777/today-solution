import { DialogsProvider } from "@toolpad/core/useDialogs";
import { Route, Routes } from "react-router-dom";

import { UserProvider } from "./context/userContext";
import { CustomThemeProvider } from "./context/ThemeContext";

import Home from "./pages/Home";
import Solution from "./pages/Solution";
import NotFound from "./pages/NotFound";
import Record from "./pages/Record";
import Edit from "./pages/Edit";
import RecordList from "./pages/RecordList";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Redirection from "./pages/Redirection";
import LoggedInRoute from "./components/common/LoggedInRoute";
import NotLoggedInRoute from "./components/common/NotLoggedInRoute";

const App = () => {
  // 1. "/" 메인 홈페이지
  // 2. "/solution" 솔루션 페이지
  // 3. "/record" 기록하기 페이지
  // 4. "/edit/:id" 기록 수정 페이지
  // 5. "/recordlist" 기록 리스트 페이지
  // 6. "/detail/:id 기록 상세 페이지
  // 7. "/login" 로그인 페이지
  // 8. "/kakao/callback" 카카오 로그인 콜백 페이지
  return (
    <>
      <CustomThemeProvider>
        <DialogsProvider>
          <UserProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/solution" element={<Solution />} />
              <Route path="*" element={<NotFound />} />
              <Route element={<LoggedInRoute />}>
                <Route path="/record" element={<Record />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/recordlist" element={<RecordList />} />
                <Route path="/detail/:id" element={<Detail />} />
              </Route>
              <Route element={<NotLoggedInRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/kakao/callback" element={<Redirection />} />
              </Route>
            </Routes>
          </UserProvider>
        </DialogsProvider>
      </CustomThemeProvider>
    </>
  );
};

export default App;

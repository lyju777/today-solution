import { useNavigate } from "react-router-dom";
import "../components/styles/NotFound.scss";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Button } from "@mui/material";

const NotFound = () => {
  const nav = useNavigate();
  return (
    <div className="NotFound">
      <h1>404</h1>
      <p>잘못된 경로입니다...😭 다른 페이지로 이동해주세요. </p>
      <Button
        onClick={() => nav("/")}
        startIcon={<KeyboardBackspaceIcon />}
        variant="outlined"
      >
        돌아가기
      </Button>
    </div>
  );
};

export default NotFound;

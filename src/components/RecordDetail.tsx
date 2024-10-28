import { useState, useContext, useEffect } from "react";
import { RecordDispatchContext } from "../context/recordContext";
import { useNavigate } from "react-router-dom";
import { Button, CardContent, Typography } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import CreateIcon from "@mui/icons-material/Create";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { getStringedDate } from "../util/get-stringed-date";
import { InitRecord } from "../types/types";

import "./styles/RecordDetail.scss";

interface RecordEditFormProps {
  initData: InitRecord;
}

const RecordDetail: React.FC<RecordEditFormProps> = ({ initData }) => {
  const context = useContext(RecordDispatchContext);

  if (!context) {
    throw new Error("'cannot find RecordDispatchContext");
  }

  const [input, setInput] = useState<InitRecord>({
    id: "",
    recordTitle: "",
    recordDate: new Date(),
    recordContent: "",
  });

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        recordDate: new Date(initData.recordDate),
      });
    }
  }, [initData]);

  const saveDisabled = () => {
    return (
      !input.recordContent ||
      isNaN(input.recordDate.getTime()) ||
      !input.recordTitle
    );
  };

  const nav = useNavigate();
  return (
    <div className="RecordDetail">
      <div className="RecordDetail__area">
        <CardContent className="custom-component">
          <Typography variant="h6" component="div">
            <CommentIcon fontSize="small" /> {input.recordTitle}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 2 }}>
            {getStringedDate(input.recordDate)}
          </Typography>
          <Typography className="recordContent" variant="body1">
            {input.recordContent}
          </Typography>
          <br />
          {initData?.todaySolution && (
            <Typography
              className="recordContent"
              variant="body2"
              component="div"
            >
              {`# 오늘의 솔루션 "${initData?.todaySolution}"`}
            </Typography>
          )}

          <div className="RecordDetail__area__button">
            <Button
              className="custom-button"
              onClick={() => nav("/recordlist")}
              variant="outlined"
              color="inherit"
              startIcon={<KeyboardBackspaceIcon />}
              disabled={saveDisabled()}
            >
              돌아가기
            </Button>
            <Button
              className="custom-button"
              onClick={() => nav(`/edit/${initData.id}`)}
              variant="outlined"
              color="inherit"
              startIcon={<CreateIcon />}
              disabled={saveDisabled()}
            >
              기록수정
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default RecordDetail;

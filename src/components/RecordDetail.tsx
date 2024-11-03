import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CardContent, Typography } from "@mui/material";
import { UserContext } from "../context/userContext";
import CommentIcon from "@mui/icons-material/Comment";
import CreateIcon from "@mui/icons-material/Create";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { getStringedDate } from "../util/get-stringed-date";
import { InitRecord } from "../types/types";
import { getRecordDetail } from "../api/record";

import "./styles/RecordDetail.scss";

interface RecordEditFormProps {
  recordId: string;
}

const RecordDetail: React.FC<RecordEditFormProps> = ({ recordId }) => {
  const nav = useNavigate();

  const [input, setInput] = useState<InitRecord>({
    recordId: "",
    recordTitle: "",
    recordedDate: new Date(),
    recordContent: "",
    todaySolution: "",
  });

  const userContext = useContext(UserContext);
  const { token } = userContext;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRecordDetail("record", recordId, token);
        if (response) {
          setInput({
            ...response.data,
            recordedDate: new Date(response.data.recordedDate),
          });
        }
      } catch (error) {
        nav("/", { replace: true });
        console.error(error);
      }
    };
    fetchData();
  }, [recordId, token, nav]);

  const saveDisabled = () => {
    return (
      !input.recordContent ||
      typeof input.recordedDate === "string" ||
      isNaN(input.recordedDate.getTime()) ||
      !input.recordTitle
    );
  };

  return (
    <div className="RecordDetail">
      <div className="RecordDetail__area">
        <CardContent className="custom-component">
          <Typography variant="h6" component="div">
            <CommentIcon fontSize="small" /> {input.recordTitle}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 2 }}>
            {getStringedDate(new Date(input.recordedDate))}
          </Typography>
          <Typography className="recordContent" variant="body1">
            {input.recordContent}
          </Typography>
          <br />
          {input.todaySolution && (
            <Typography
              className="recordContent"
              variant="body2"
              component="div"
            >
              {`# 오늘의 솔루션 "${input.todaySolution}"`}
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
              onClick={() => nav(`/edit/${recordId}`)}
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

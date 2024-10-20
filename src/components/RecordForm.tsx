import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import "./styles/Record.scss";

interface Record {
  recordDate: Date | string;
  recordContent: string;
}

const RecordForm = () => {
  const [input, setInput] = useState<Record>({
    recordDate: new Date(),
    recordContent: "",
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.target.name;
    const value: Date | string = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const nav = useNavigate();
  return (
    <div className="Record">
      <h3>오늘의 생각을 기록해보세요.</h3>
      <div className="Record__area">
        <TextField
          value={input.recordDate}
          name="recordDate"
          className="custom-textfield"
          size="small"
          id="date"
          label=""
          type="date"
          onChange={onChangeInput}
        />
        <TextField
          value={input.recordContent}
          name="recordContent"
          className="custom-textfield"
          id="outlined-multiline-static"
          label="기록할 내용을 입력하세요."
          multiline
          rows={4}
          onChange={onChangeInput}
        />
        <Button
          className="custom-button"
          onClick={() => nav("/recordlist")}
          variant="outlined"
          color="inherit"
          startIcon={<CreateIcon />}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
};

export default RecordForm;

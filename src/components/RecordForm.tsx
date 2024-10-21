import { useState, useContext } from "react";
import { RecordDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { getStringedDate } from "../util/get-stringed-date";
import "./styles/Record.scss";

interface Record {
  recordDate: Date;
  recordContent: string;
}

const RecordForm = () => {
  const context = useContext(RecordDispatchContext);
  if (!context) {
    throw new Error("RecordDispatchContext is undefined");
  }
  const { onCreate } = context;

  const [input, setInput] = useState<Record>({
    recordDate: new Date(),
    recordContent: "",
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.target.name;
    let value: Date | string = e.target.value;

    if (name === "recordDate") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSubmit = (input: Record) => {
    onCreate(input.recordDate, input.recordContent);
    nav("/recordlist", { replace: true });
  };

  const nav = useNavigate();
  return (
    <div className="Record">
      <h3>오늘의 생각을 기록해보세요.</h3>
      <div className="Record__area">
        <TextField
          value={getStringedDate(input.recordDate)}
          name="recordDate"
          className="custom-textfield"
          size="small"
          id="date"
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
          onClick={() => onSubmit(input)}
          variant="outlined"
          color="inherit"
          startIcon={<CreateIcon />}
          disabled={!input.recordContent || isNaN(input.recordDate.getTime())}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
};

export default RecordForm;

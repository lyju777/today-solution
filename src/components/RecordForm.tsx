import { useState, useContext } from "react";
import { RecordDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { getStringedDate } from "../util/get-stringed-date";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import "./styles/RecordForm.scss";
import { InitRecord } from "../types/types";

const RecordForm = () => {
  const context = useContext(RecordDispatchContext);
  if (!context) {
    throw new Error("RecordDispatchContext is undefined");
  }
  const { onCreate } = context;

  const [input, setInput] = useState<InitRecord>({
    recordTitle: "",
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

  const onSubmit = (input: InitRecord) => {
    onCreate(input.recordDate, input.recordContent, input.recordTitle);
    nav("/recordlist", { replace: true });
  };

  const saveDisabled = () => {
    return (
      !input.recordContent ||
      isNaN(input.recordDate.getTime()) ||
      !input.recordTitle
    );
  };

  const nav = useNavigate();
  return (
    <div className="RecordForm">
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
          value={input.recordTitle}
          name="recordTitle"
          className="custom-textfield"
          size="small"
          label="제목을 입력하세요."
          slotProps={{ htmlInput: { maxLength: 50 } }}
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
          startIcon={<SaveAsIcon />}
          disabled={saveDisabled()}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
};

export default RecordForm;

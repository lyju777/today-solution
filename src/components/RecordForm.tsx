import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { getStringedDate, formatNewDate } from "../util/get-stringed-date";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./styles/Record.scss";
import { InitRecord } from "../types/types";
import { createRecord } from "../api/record";

const RecordForm = () => {
  const nav = useNavigate();

  const [input, setInput] = useState<InitRecord>({
    recordTitle: "",
    recordedDate: new Date(),
    recordContent: "",
    todaySolution: "",
  });

  useEffect(() => {
    const getSolution = sessionStorage.getItem("randomSolutions");
    if (getSolution) {
      setInput((input) => ({
        ...input,
        todaySolution: JSON.parse(getSolution).solution,
      }));
    }
  }, []);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.target.name;
    let value: Date | string = e.target.value;

    if (name === "recordedDate") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSubmit = async (input: InitRecord) => {
    const recordedDate = formatNewDate(input.recordedDate);

    const params = {
      recordedDate: recordedDate,
      recordContent: input.recordContent,
      recordTitle: input.recordTitle,
      todaySolution: input.todaySolution || "",
    };
    try {
      await createRecord("record", params);
      nav("/recordlist", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const saveDisabled = () => {
    return (
      !input.recordContent ||
      typeof input.recordedDate === "string" ||
      isNaN(input.recordedDate.getTime()) ||
      !input.recordTitle
    );
  };

  return (
    <div className="Record">
      <h3>오늘의 생각을 기록해보세요.</h3>
      <div className="Record__area">
        <TextField
          value={
            typeof input.recordedDate === "string"
              ? input.recordedDate
              : getStringedDate(input.recordedDate)
          }
          name="recordedDate"
          className="custom-component"
          size="small"
          id="date"
          type="date"
          onChange={onChangeInput}
        />
        <TextField
          value={input.recordTitle}
          name="recordTitle"
          className="custom-component"
          size="small"
          label="제목을 입력하세요."
          slotProps={{ htmlInput: { maxLength: 50 } }}
          onChange={onChangeInput}
        />
        <TextField
          value={input.recordContent}
          name="recordContent"
          className="custom-component"
          id="outlined-multiline-static"
          label="기록할 내용을 입력하세요."
          multiline
          rows={6}
          onChange={onChangeInput}
        />
        <div className="Record__area__button">
          <Button
            className="custom-button"
            onClick={() => nav("/")}
            variant="outlined"
            color="inherit"
            startIcon={<KeyboardBackspaceIcon />}
          >
            돌아가기
          </Button>

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
    </div>
  );
};

export default RecordForm;

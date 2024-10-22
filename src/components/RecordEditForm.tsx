import { useState, useContext, useEffect } from "react";
import { RecordDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { getStringedDate } from "../util/get-stringed-date";
import { InitRecord } from "../types/types";

import "./styles/RecordEdit.scss";
import { SpeakerNotesOff } from "@mui/icons-material";

interface RecordEditFormProps {
  initData: InitRecord;
}

const RecordEditForm: React.FC<RecordEditFormProps> = ({ initData }) => {
  const context = useContext(RecordDispatchContext);

  if (!context) {
    throw new Error("'cannot find RecordDispatchContext");
  }

  const { onUpdate, onDelete } = context;

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
    if (window.confirm("기록을 수정하시겠습니까?")) {
      if (!input.id) {
        return;
      }
      onUpdate(
        input.id,
        input.recordDate,
        input.recordContent,
        input.recordTitle
      );
      nav("/recordlist", { replace: true });
    }
  };

  const onClickDelete = (id: string) => {
    if (window.confirm("기록을 삭제하시겠습니까?")) {
      onDelete(id);
      nav("/recordlist", { replace: true });
    }
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
        <div className="Record__area__button">
          <Button
            className="custom-button"
            onClick={() => onSubmit(input)}
            variant="outlined"
            color="inherit"
            startIcon={<CreateIcon />}
            disabled={saveDisabled()}
          >
            수정하기
          </Button>
          <Button
            className="custom-button"
            onClick={() => initData.id && onClickDelete(initData.id)}
            variant="outlined"
            color="inherit"
            startIcon={<SpeakerNotesOff />}
          >
            삭제하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecordEditForm;

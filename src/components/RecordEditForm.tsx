import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { Button, TextField } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useDialogs } from "@toolpad/core/useDialogs";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import { getStringedDate } from "../util/get-stringed-date";
import { InitRecord } from "../types/types";
import { getRecordDetail, editRecord, deleteRecord } from "../api/record";
import { formatNewDate } from "../util/get-stringed-date";

import "./styles/Record.scss";

interface RecordEditFormProps {
  recordId: string;
}

const RecordEditForm: React.FC<RecordEditFormProps> = ({ recordId }) => {
  const dialogs = useDialogs();
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
    try {
      const confirmed = await dialogs.confirm("기록을 수정하시겠습니까?", {
        title: "수정하기",
        okText: "확인",
        cancelText: "취소",
      });

      if (confirmed) {
        if (!input.recordId) {
          return;
        }
        const params = Object.assign({}, input);
        params.recordedDate = formatNewDate(input.recordedDate);
        delete params.todaySolution;

        await editRecord("record", params, token);
        nav(`/detail/${recordId}`, { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickDelete = async (recordId: string) => {
    try {
      const confirmed = await dialogs.confirm("기록을 삭제하시겠습니까?", {
        title: "삭제하기",
        okText: "확인",
        cancelText: "취소",
      });
      if (confirmed) {
        if (!recordId) {
          return;
        }
        await deleteRecord("record", recordId, token);
        nav("/recordlist", { replace: true });
      }
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
            onClick={() => recordId && onClickDelete(recordId)}
            variant="outlined"
            color="inherit"
            startIcon={<CommentsDisabledIcon />}
          >
            삭제하기
          </Button>
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
        </div>
      </div>
    </div>
  );
};

export default RecordEditForm;

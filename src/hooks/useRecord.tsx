import { useContext, useState, useEffect } from "react";
import { RecordStateContext } from "../App";
import { InitRecord } from "../types/types";

const useRecord = (id: string) => {
  // const nav = useNavigate();
  const data = useContext(RecordStateContext);

  const [CurrentRecordItem, setCurrentRecordItem] = useState<InitRecord>();

  useEffect(() => {
    if (!data) {
      return;
    }

    const CurrentRecordItem = data.find((item) => item.id === id);

    setCurrentRecordItem(CurrentRecordItem);
  }, [id, data]);

  return CurrentRecordItem;
};

export default useRecord;

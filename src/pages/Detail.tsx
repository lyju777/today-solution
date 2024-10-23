import Header from "../components/common/Header";
import RecordDetail from "../components/RecordDetail";
import { useParams } from "react-router-dom";
import useRecord from "../hooks/useRecord";
import { InitRecord } from "../types/types";

const Detail = () => {
  const params = useParams();
  const CurrentRecordItem: InitRecord | undefined = useRecord(params.id || "");
  return (
    <div>
      <Header />
      <RecordDetail initData={CurrentRecordItem as InitRecord} />
    </div>
  );
};

export default Detail;

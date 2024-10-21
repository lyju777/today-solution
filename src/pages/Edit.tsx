import { useParams } from "react-router-dom";
import Header from "../components/common/Header";
import RecordEditForm from "../components/RecordEditForm";
import useRecord from "../hooks/useRecord";
import { InitRecord } from "../types/types";

const Edit = () => {
  const params = useParams();
  const CurrentRecordItem: InitRecord | undefined = useRecord(params.id || "");

  return (
    <div>
      <Header />
      <RecordEditForm initData={CurrentRecordItem as InitRecord} />
    </div>
  );
};

export default Edit;

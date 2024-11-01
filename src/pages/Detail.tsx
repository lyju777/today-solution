import Header from "../components/common/Header";
import RecordDetail from "../components/RecordDetail";
import { useParams } from "react-router-dom";
import ActionButton from "../components/common/ActionButton";

const Detail = () => {
  const params = useParams();
  return (
    <div>
      <Header />
      <RecordDetail recordId={params.id ?? ""} />
      <ActionButton />
    </div>
  );
};

export default Detail;

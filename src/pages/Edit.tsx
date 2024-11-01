import { useParams } from "react-router-dom";
import Header from "../components/common/Header";
import RecordEditForm from "../components/RecordEditForm";
import ActionButton from "../components/common/ActionButton";

const Edit = () => {
  const params = useParams();

  return (
    <div>
      <Header />
      <RecordEditForm recordId={params.id ?? ""} />
      <ActionButton />
    </div>
  );
};

export default Edit;

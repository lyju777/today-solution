import { useEffect, useLayoutEffect, useState } from "react";
import { Solution, getRandomSolution } from "../util/solution";
import { useNavigate } from "react-router-dom";
import "./styles/SolutionItem.scss";
import { Button } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import CreateIcon from "@mui/icons-material/Create";

const SolutionItem = () => {
  const nav = useNavigate();
  const [randomSolutions, setRandomSolutions] = useState<Solution>();

  useLayoutEffect(() => {
    const solution = getRandomSolution();
    setRandomSolutions(solution);
  }, []);

  useEffect(() => {
    if (randomSolutions) {
      sessionStorage.setItem(
        "randomSolutions",
        JSON.stringify(randomSolutions)
      );
    }
  }, [randomSolutions]);

  return (
    <div className="SolutionItem">
      <h3>{randomSolutions?.solution}</h3>
      <div className="SolutionItem__button">
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<ReplayIcon />}
          onClick={() => nav("/")}
        >
          다시하기
        </Button>
        <Button
          onClick={() => nav("/record")}
          variant="outlined"
          color="inherit"
          startIcon={<CreateIcon />}
        >
          기록하기
        </Button>
      </div>
    </div>
  );
};

export default SolutionItem;

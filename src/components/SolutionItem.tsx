import { useLayoutEffect, useState } from "react";
import { Solution, getRandomSolution } from "../util/solution";
import "./styles/SolutionItem.scss";

const SolutionItem = () => {
  const [randomSolutions, setRandomSolutions] = useState<Solution>();

  useLayoutEffect(() => {
    setRandomSolutions(getRandomSolution());
  }, []);

  return (
    <div className="SolutionItem">
      <h3>{randomSolutions?.solution}</h3>
    </div>
  );
};

export default SolutionItem;

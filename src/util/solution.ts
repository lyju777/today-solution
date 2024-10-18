export interface Solution {
  id: string;
  solution: string;
}

export const getRandomSolution = (): Solution => {
  const randomIndex = Math.floor(Math.random() * solutions.length);
  return solutions[randomIndex];
};

export const solutions: Solution[] = [
  {
    id: "1",
    solution: "첫번쨰 솔루션입니다.",
  },
  {
    id: "2",
    solution: "두번쨰 솔루션입니다.",
  },
  {
    id: "3",
    solution: "세번쨰 솔루션입니다.",
  },
  {
    id: "4",
    solution: "네번쨰 솔루션입니다.",
  },
  {
    id: "5",
    solution: "다섯번쨰 솔루션입니다.",
  },
  {
    id: "6",
    solution: "여섯번쨰 솔루션입니다.",
  },
  {
    id: "7",
    solution: "일곱번쨰 솔루션입니다.",
  },
  {
    id: "8",
    solution: "여덟번쨰 솔루션입니다.",
  },
  {
    id: "9",
    solution: "아홉번쨰 솔루션입니다.",
  },
  {
    id: "10",
    solution: "열번쨰 솔루션입니다.",
  },
];

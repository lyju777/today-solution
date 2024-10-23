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
    solution: "당신의 생각대로다.",
  },
  {
    id: "2",
    solution: "안정적으로 행하라",
  },
  {
    id: "3",
    solution: "온전히 당신에게 달려있다.",
  },
  {
    id: "4",
    solution: "도움을 받아라.",
  },
  {
    id: "5",
    solution: "이 일로 많은것이 바뀔것이다.",
  },
  {
    id: "6",
    solution: "홀로 헤쳐나가지 않을 것이다.",
  },
  {
    id: "7",
    solution: "고생 끝에 낙이 올 것이다.",
  },
  {
    id: "8",
    solution: "바빠질 것이다.",
  },
  {
    id: "9",
    solution: "극복 가능한 어려움이다.",
  },
  {
    id: "10",
    solution: "너무 세게 나가고 있다.",
  },
  {
    id: "11",
    solution: "많이 집착하지 말라",
  },
  {
    id: "12",
    solution: "즐거움을 찾아라",
  },
  {
    id: "13",
    solution: "긍정적이다.",
  },
  {
    id: "14",
    solution: "이겨낼 수 있는 손실이다.",
  },
  {
    id: "15",
    solution: "그럴 수는 없다.",
  },
  {
    id: "16",
    solution: "어렵게 해낼 것이다.",
  },
  {
    id: "17",
    solution: "그럴 수는 없다.",
  },
  {
    id: "18",
    solution: "슬슬 이루어져 가고있다.",
  },
  {
    id: "19",
    solution: "당황하지 말라",
  },
  {
    id: "20",
    solution: "약간의 고집이 필요하다.",
  },
  {
    id: "21",
    solution: "삶에 큰 영향이 없을 것이다.",
  },
  {
    id: "22",
    solution: "조금 넓게 생각해봐라",
  },
  {
    id: "23",
    solution: "새로운 길을 생각해봐라",
  },
  {
    id: "24",
    solution: "무리하지 마라",
  },
  {
    id: "25",
    solution: "좀 더 의견을 경청해라",
  },
  {
    id: "26",
    solution: "현실적인 관점으로",
  },
  {
    id: "27",
    solution: "그럴만 하다.",
  },
  {
    id: "28",
    solution: "그럴만한 가치가 있다.",
  },
  {
    id: "29",
    solution: "분명하게 행동해라",
  },
  {
    id: "30",
    solution: "많은 정보를 얻어라",
  },
  {
    id: "31",
    solution: "주변을 경계해라",
  },
  {
    id: "32",
    solution: "눈 앞의 정답을 놓치고있다.",
  },
  {
    id: "33",
    solution: "많은 시간을 투자해라",
  },
  {
    id: "34",
    solution: "휴식이 필요하다.",
  },
  {
    id: "35",
    solution: "이대로만 가면 된다.",
  },
  {
    id: "36",
    solution: "당장 실천해라",
  },
  {
    id: "37",
    solution: "흠...",
  },
  {
    id: "38",
    solution: "귀인을 만날 것이다.",
  },
  {
    id: "39",
    solution: "다시한번 생각해보자",
  },
  {
    id: "40",
    solution: "부정적이다.",
  },
  {
    id: "41",
    solution: "기회는 영원하지 않다.",
  },
  {
    id: "42",
    solution: "깊은 생각이 필요하다.",
  },
  {
    id: "43",
    solution: "운이 따를 것이다.",
  },
  {
    id: "44",
    solution: "더 노력해보자",
  },
  {
    id: "45",
    solution: "다른 사람의 말을 듣지 마라",
  },
  {
    id: "46",
    solution: "떄로는 우연에 기대라",
  },
  {
    id: "47",
    solution: "신중함이 필요하다.",
  },
  {
    id: "48",
    solution: "앞서 나아가라",
  },
  {
    id: "49",
    solution: "또 한번의 기회가 온다.",
  },
  {
    id: "50",
    solution: "지금 바로 도전해라",
  },
];

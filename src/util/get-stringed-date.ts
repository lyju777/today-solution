import dayjs from "dayjs";

export const getStringedDate = (targetDate: Date): string => {
  const year: number = targetDate.getFullYear();
  const month: number = targetDate.getMonth() + 1;
  const date: number = targetDate.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${
    date < 10 ? `0${date}` : date
  }`;
};

// new Date() -> YYYY-MM-DD HH:mm:ss
export const formatNewDate = (targetDate: Date | string): string => {
  const date = dayjs(targetDate);
  const formattedDate = date.format("YYYY-MM-DD HH:mm:ss");
  return formattedDate;
};

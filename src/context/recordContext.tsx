import { createContext, useReducer, ReactNode, useEffect } from "react";
import { reducer } from "../reducer/recordReducer";
import {
  RecordStateContextType,
  RecordDispatchContextType,
} from "../types/types";
import { v4 as uuidv4 } from "uuid";

export const RecordStateContext = createContext<
  RecordStateContextType[] | undefined
>(undefined);
export const RecordDispatchContext = createContext<
  RecordDispatchContextType | undefined
>(undefined);

interface RecordProviderProps {
  children: ReactNode;
}

export const RecordProvider = ({ children }: RecordProviderProps) => {
  const [data, dispatch] = useReducer(reducer, []);
  const uuid = uuidv4();

  useEffect(() => {
    const storedData = localStorage.getItem("record");
    const parsedData = storedData ? JSON.parse(storedData) : [];

    dispatch({
      type: "INIT",
      data: parsedData,
    });
  }, []);

  const onCreate = (
    recordDate: Date,
    recordContent: string,
    recordTitle: string,
    todaySolution: string
  ) => {
    dispatch({
      type: "CREATE",
      data: { id: uuid, recordDate, recordContent, recordTitle, todaySolution },
    });
  };

  const onUpdate = (
    id: string,
    recordDate: Date,
    recordContent: string,
    recordTitle: string,
    todaySolution: string
  ) => {
    dispatch({
      type: "UPDATE",
      data: { id, recordDate, recordContent, recordTitle, todaySolution },
    });
  };

  const onDelete = (id: string) => {
    dispatch({ type: "DELETE", id });
  };

  return (
    <RecordStateContext.Provider value={data}>
      <RecordDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        {children}
      </RecordDispatchContext.Provider>
    </RecordStateContext.Provider>
  );
};

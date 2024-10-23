export interface InitRecord {
  id?: string;
  recordTitle: string;
  recordDate: Date;
  recordContent: string;
}

export type Action =
  | { type: "INIT"; data: InitRecord[] }
  | { type: "CREATE"; data: InitRecord }
  | { type: "UPDATE"; data: InitRecord }
  | { type: "DELETE"; id: string };

export type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export type RecordStateContextType = InitRecord;

export type RecordDispatchContextType = {
  onCreate: (
    recordDate: Date,
    recordContent: string,
    recordTitle: string
  ) => void;
  onUpdate: (
    id: string,
    recordDate: Date,
    recordContent: string,
    recordTitle: string
  ) => void;
  onDelete: (id: string) => void;
};

export interface InitRecord {
  recordId?: string;
  recordTitle: string;
  recordedDate: string | Date;
  recordContent: string;
  todaySolution?: string;
}

export interface UserData {
  nickName: string;
  profileImage: string;
  thumbnailImage: string;
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
    recordedDate: string,
    recordContent: string,
    recordTitle: string,
    todaySolution: string
  ) => void;
  onUpdate: (
    id: string,
    recordedDate: Date,
    recordContent: string,
    recordTitle: string,
    todaySolution: string
  ) => void;
  onDelete: (id: string) => void;
};

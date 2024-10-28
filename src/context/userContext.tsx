import { createContext, useState, useEffect, ReactNode } from "react";
import { UserData } from "../types/types";

interface userContext {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export const UserContext = createContext<userContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    nickName: "",
    profileImage: "",
    thumbnailImage: "",
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

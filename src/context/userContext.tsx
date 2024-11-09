import { createContext, useState, useEffect, ReactNode } from "react";
import { UserData } from "../types/types";
import Cookies from "js-cookie";

interface userContext {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  token: string;
}

export const UserContext = createContext<userContext>({
  userData: {
    nickName: "",
    profileImage: "",
    thumbnailImage: "",
  },
  setUserData: () => {},
  token: "",
  loading: true,
  setLoading: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    nickName: "",
    profileImage: "",
    thumbnailImage: "",
  });

  const [loading, setLoading] = useState(true);

  const token = Cookies.get("access_token") || "";

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, token, loading, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

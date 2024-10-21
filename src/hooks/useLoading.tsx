import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const themeContext = useContext(ThemeContext);
  const darkMode = themeContext?.darkMode;

  const getSolution = (location: string): void => {
    setIsLoading(true);
    setTimeout(() => {
      nav(location);
    }, 6000);
  };

  return [isLoading, getSolution, darkMode];
};

export default useLoading;

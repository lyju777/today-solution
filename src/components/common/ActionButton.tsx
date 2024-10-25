import { useNavigate } from "react-router-dom";
import "./styles/ActionButton.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Fab } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { blueGrey } from "@mui/material/colors";

interface Props {
  isLoading?: boolean;
}

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[900],
      // main: blue[900],
    },
  },
});

const ActionButton = ({ isLoading }: Props) => {
  const nav = useNavigate();

  const handleNavigation = (path: string) => {
    if (isLoading) return;
    nav(path);
  };

  return (
    <div className="ActionButton">
      <ThemeProvider theme={theme}>
        <Fab
          onClick={() => handleNavigation("/record")}
          color="primary"
          aria-label="edit"
        >
          <CreateIcon />
        </Fab>
      </ThemeProvider>
    </div>
  );
};

export default ActionButton;

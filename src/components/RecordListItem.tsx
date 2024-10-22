import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecordStateContext } from "../App";
import { getStringedDate } from "../util/get-stringed-date";
import "./styles/RecordListItem.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import NotesIcon from "@mui/icons-material/Notes";
import Typography from "@mui/material/Typography";
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const RecordListItem = () => {
  const data = useContext(RecordStateContext);
  const nav = useNavigate();

  return (
    <div className="RecordListItem">
      <div className="RecordListItem__textfield">
        <TextField
          sx={{ m: 1, minWidth: 120 }}
          size="small"
          id="outlined-select-currency"
          select
          defaultValue="new"
        >
          <MenuItem value={"new"}>{"최신순"}</MenuItem>
          <MenuItem value={"old"}>{"오래된 순"}</MenuItem>
        </TextField>

        <TextField
          id="input-with-icon-textfield"
          size="small"
          label="검색"
          variant="standard"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </div>

      <List
        className="RecordListItem__container"
        sx={{
          width: "100%",
          maxWidth: 800,
          padding: "0 20px",
          bgcolor: "background.paper",
        }}
      >
        {data?.map((item) => (
          <div key={item.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <NotesIcon />
              </ListItemAvatar>
              <ListItemText
                className="RecordListItem__container__ListItemText"
                primary={item.recordTitle}
                onClick={() => nav(`/edit/${item.id}`)}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "text.primary", display: "inline" }}
                    >
                      {getStringedDate(new Date(item.recordDate))}
                    </Typography>
                    <Typography
                      className="recordContent"
                      component="span"
                      variant="body2"
                      sx={{ display: "block" }}
                    >
                      {item.recordContent}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </div>
  );
};

export default RecordListItem;

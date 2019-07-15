import React, { useCallback } from "react";
import "./App.css";
import Input from "./container/Input";
import Board from "./components/Board";
import Grid from "@material-ui/core/Grid";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { ApiContext } from "./context/ApiContext";

const useStyles = makeStyles((theme: Theme) => {
  const root = {
    [theme.breakpoints.up("md")]: {
      width: 1280
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: 960
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  };
  return createStyles({
    root,
    input: {
      ...root,
      padding: 16,
      paddingBottom: 0
    }
  });
});

const App: React.FC = () => {
  const classes = useStyles();
  const api = React.useContext(ApiContext);

  const handleClickBoardItem = useCallback(url => {
    const win = window.open(url, "_blank");
    if (win) win.focus();
  }, []);

  const handleRequestClose = useCallback(
    _id => {
      api.action.cancel(_id);
    },
    [api.data]
  );

  return (
    <div className="App">
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item className={classes.input}>
          <Input />
        </Grid>
        <Grid item className={classes.root}>
          <Grid
            container
            direction="row"
            spacing={2}
            style={{ flexGrow: 1, padding: 16 }}
          >
            {api.data.map((item, key) => (
              <Grid item key={key}>
                <Board
                  onClickBoardItem={handleClickBoardItem}
                  onRequestClose={handleRequestClose}
                  _id={item._id}
                  email={item.email}
                  sp={item.searchPhrase}
                  time={item.interval}
                  data={item.items}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;

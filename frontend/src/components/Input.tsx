import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import MenuButton from "./MenuButton/MenuButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fixButtonPosition: {
      marginTop: -8
    },
    space: {
      width: 4,
      height: "100%"
    },
    root: {
      padding: "2px 4px",
      display: "flex",
      flexDirection: "column",
      // alignItems: "center",
      width: 400
    },
    row: {
      display: "flex",
      flexDirection: "row"
    },
    input: {
      marginLeft: 8,
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      width: 1,
      height: 28,
      margin: 4
    },
    root2: {
      display: "flex"
    },
    paper: {
      marginRight: theme.spacing(2)
    }
  })
);

const messages = {
  2: "2 min",
  10: "10 min",
  30: "30 min"
} as {
  2: string;
  10: string;
  30: string;
};

type IntervalValues = 2 | 10 | 30;

export default function CustomizedInputBase() {
  const classes = useStyles();

  const [interval, setInterval] = React.useState(10 as IntervalValues);

  return (
    <div className={classes.row}>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Email"
          inputProps={{ "aria-label": "email", type: "email" }}
        />
        <div className={classes.row}>
          <InputBase
            className={classes.input}
            placeholder="Search Phrase"
            inputProps={{ "aria-label": "Search Phrase" }}
          />
          <Divider className={classes.divider} />
          <div className={classes.root2}>
            <MenuButton
              onChange={setInterval}
              message={messages[interval]}
              data={[
                {
                  label: "2 minutos",
                  value: 2
                },
                {
                  label: "10 minutos",
                  value: 10
                },
                {
                  label: "30 minutos",
                  value: 30
                }
              ]}
            />
          </div>
        </div>
      </Paper>
      <div className={classes.space} />
      <Button variant="contained" color="primary">
        Registrar
      </Button>
    </div>
  );
}

import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Button } from "@material-ui/core";

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

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [interval, setInterval] = React.useState(10 as IntervalValues);

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  const handleClose = (intervalDesired?: IntervalValues) => (
    event: React.MouseEvent<EventTarget>
  ) => {
    if (intervalDesired) {
      setInterval(intervalDesired);
    }
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      // @ts-ignore
      return;
    }

    setOpen(false);
  };

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
            <div>
              <Button
                className={classes.fixButtonPosition}
                ref={anchorRef}
                aria-controls="menu-list-grow"
                aria-haspopup="true"
                onClick={handleToggle}
              >
                {messages[interval]}
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                keepMounted={false}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom"
                    }}
                  >
                    <Paper id="menu-list-grow">
                      <ClickAwayListener onClickAway={handleClose()}>
                        <MenuList>
                          <MenuItem onClick={handleClose(2)}>
                            2 minutos
                          </MenuItem>
                          <MenuItem onClick={handleClose(10)}>
                            10 minutos
                          </MenuItem>
                          <MenuItem onClick={handleClose(30)}>
                            30 minutos
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
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

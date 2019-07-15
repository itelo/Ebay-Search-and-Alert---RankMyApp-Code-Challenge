import React from "react";
import Paper from "@material-ui/core/Paper";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Button from "@material-ui/core/Button";

type CustomizedInputBaseProps = {
  message: string;
  onChange(value: "2" | "10" | "30"): void;
  data: DataT[];
};

type DataT = {
  label: string;
  value: "2" | "10" | "30";
};

const CustomizedInputBase: React.FC<CustomizedInputBaseProps> = props => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function handleClose(intervalDesired?: "2" | "10" | "30") {
    return (event: React.MouseEvent<EventTarget>) => {
      if (intervalDesired) {
        props.onChange(intervalDesired);
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
  }

  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls="menu-list-grow"
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {props.message}
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
                  {props.data.map(item => (
                    <MenuItem
                      key={item.value}
                      onClick={handleClose(item.value)}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default CustomizedInputBase;

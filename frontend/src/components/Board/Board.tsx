import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Grid, Divider, Tooltip } from "@material-ui/core";

// Icons
import RefreshIcon from "@material-ui/icons/RefreshOutlined";
import CloseIcon from "@material-ui/icons/CloseOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: (256 * 5) / 3
    },
    iconClose: {
      fontSize: theme.typography.body2.fontSize
    },
    header: {
      padding: theme.spacing(1, 1)
    }
  })
);

export default function PaperSheet() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper>
        <div className={classes.header}>
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Typography variant="caption" component="h3">
                itelofilho@gmail.com
              </Typography>
            </Grid>
            <Grid item>
              <Grid container direction="row">
                <CloseIcon
                  className={classes.iconClose}
                  onClick={() => alert("close")}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Tooltip title="Search Phrase: Macaquinhos" placement="top">
                <Typography variant="body2" component="p">
                  SP: Macaquinhos
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item>
              <Grid container direction="row" alignItems="center">
                <Typography variant="body2" component="p">
                  2 min
                </Typography>
                <RefreshIcon onClick={() => alert("refresh")} />
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <div style={{ height: 300 }} />
      </Paper>
    </div>
  );
}

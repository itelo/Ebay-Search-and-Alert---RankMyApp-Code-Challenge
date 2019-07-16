import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      width: 96,
      height: 96,
      objectFit: "cover",
      borderRadius: 4,
      margin: theme.spacing(0, 1, 0, 0)
    }
  })
);

type BoardItemProps = {
  title: string;
  price: string;
  imageURL?: string;
  onClick(): void;
};

const BoardItem: React.FC<BoardItemProps> = props => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      onClick={props.onClick}
      data-testid="button-tag"
    >
      {props.imageURL && (
        <Grid item>
          <img
            data-testid="image-tag"
            alt="IMAGE_OF_PRODUCT"
            src={props.imageURL}
            className={classes.image}
          />
        </Grid>
      )}
      <Grid item xs>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignContent="flex-end"
        >
          <Grid item xs>
            <Typography variant="body1" component="p" data-testid="title-tag">
              {props.title}
            </Typography>
            <Typography variant="h6" component="p" data-testid="price-tag">
              US ${props.price}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BoardItem;

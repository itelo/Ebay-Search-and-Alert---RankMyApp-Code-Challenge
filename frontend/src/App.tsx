import React from "react";
import "./App.css";
import Input from "./components/Input";
import Board from "./components/Board";
import Grid from "@material-ui/core/Grid";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const boards = [
  [
    {
      _id: "1",
      imageURL: "https://i.ebayimg.com/images/g/cM0AAOSwJ3dc9oRn/s-l500.jpg",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "37,00"
    },
    {
      _id: "2",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "32,00"
    },
    {
      _id: "3",
      imageURL: "https://i.ebayimg.com/images/g/cM0AAOSwJ3dc9oRn/s-l500.jpg",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "37,00"
    }
  ],
  [
    {
      _id: "1",
      imageURL: "https://i.ebayimg.com/images/g/cM0AAOSwJ3dc9oRn/s-l500.jpg",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "37,00"
    },
    {
      _id: "2",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "32,00"
    },
    {
      _id: "3",
      imageURL: "https://i.ebayimg.com/images/g/cM0AAOSwJ3dc9oRn/s-l500.jpg",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "37,00"
    }
  ],
  [
    {
      _id: "1",
      imageURL: "https://i.ebayimg.com/images/g/cM0AAOSwJ3dc9oRn/s-l500.jpg",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "37,00"
    },
    {
      _id: "2",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "32,00"
    },
    {
      _id: "3",
      imageURL: "https://i.ebayimg.com/images/g/cM0AAOSwJ3dc9oRn/s-l500.jpg",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "37,00"
    }
  ],
  [
    {
      _id: "1",
      imageURL: "https://i.ebayimg.com/images/g/cM0AAOSwJ3dc9oRn/s-l500.jpg",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "37,00"
    },
    {
      _id: "2",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "32,00"
    },
    {
      _id: "3",
      imageURL: "https://i.ebayimg.com/images/g/cM0AAOSwJ3dc9oRn/s-l500.jpg",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "37,00"
    }
  ],
  [
    {
      _id: "1",
      imageURL: "https://i.ebayimg.com/images/g/cM0AAOSwJ3dc9oRn/s-l500.jpg",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "37,00"
    },
    {
      _id: "2",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "32,00"
    },
    {
      _id: "3",
      imageURL: "https://i.ebayimg.com/images/g/cM0AAOSwJ3dc9oRn/s-l500.jpg",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "37,00"
    }
  ],
  [
    {
      _id: "2",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "32,00"
    },
    {
      _id: "3",
      imageURL: "https://i.ebayimg.com/images/g/cM0AAOSwJ3dc9oRn/s-l500.jpg",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "37,00"
    }
  ],
  [
    {
      _id: "1",
      imageURL: "https://i.ebayimg.com/images/g/cM0AAOSwJ3dc9oRn/s-l500.jpg",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "37,00"
    },
    {
      _id: "2",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "32,00"
    },
    {
      _id: "3",
      imageURL: "https://i.ebayimg.com/images/g/cM0AAOSwJ3dc9oRn/s-l500.jpg",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "37,00"
    }
  ],
  [
    {
      _id: "1",
      imageURL: "https://i.ebayimg.com/images/g/cM0AAOSwJ3dc9oRn/s-l500.jpg",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "37,00"
    },
    {
      _id: "2",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "32,00"
    },
    {
      _id: "3",
      imageURL: "https://i.ebayimg.com/images/g/cM0AAOSwJ3dc9oRn/s-l500.jpg",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "37,00"
    }
  ],
  [
    {
      _id: "1",
      imageURL: "https://i.ebayimg.com/images/g/cM0AAOSwJ3dc9oRn/s-l500.jpg",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "37,00"
    },
    {
      _id: "2",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "32,00"
    },
    {
      _id: "3",
      imageURL: "https://i.ebayimg.com/images/g/cM0AAOSwJ3dc9oRn/s-l500.jpg",
      title: "Apple MQ6J2B/A iPhone 8 64GB Smartphone (Sprint) - Dourado",
      price: "37,00"
    }
  ]
];

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
            {boards.map((board, key) => (
              <Grid item key={key}>
                <Board
                  email="itelofilho@gmail.com"
                  sp="goku"
                  time="3 min"
                  data={board}
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

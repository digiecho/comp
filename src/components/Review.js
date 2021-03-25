import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";

import ContinuousSlider from "./ContinuousSlider";
//import { TextColorPicker } from "material-ui-color";
import TextColorPicker from "./TextColorPicker";
// import MySketch from "../P5js/Sketch";
import App from "../App";

const useStyles = makeStyles((theme) => ({
  Grid: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: 700
  },
  title: {
    marginTop: theme.spacing(2)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(4)
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function Review() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid
        container
        spacing={4}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid>
          <Grid id="canvasheading" item container xs={12}>
            <App />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

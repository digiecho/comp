import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 100,
    padding: 8,
    alignSelf: "center",
  },
});

export default function ContinuousSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Typography id="continuous-slider" variant="caption">
        Font Size
      </Typography>
      <Slider
        className={classes.root}
        value={value}
        onChange={handleChange}
        aria-labelledby="continuous-slider"
        aria-label="Font Size"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={110}
        defaultValue={100}
      />
    </div>
  );
}

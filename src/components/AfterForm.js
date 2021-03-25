import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ImageUploadCardB from "../ImageUploadB";
// import ImageB from "../features/counter/ImageA";
import { uploadImageB, selectImage } from "../features/counter/counterSlice";
import { useSelector, useDispatch } from "react-redux";

export default function AfterForm() {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        After Image
      </Typography>

      <Grid spacing={3} container justify="center" alignItems="center">
        <ImageUploadCardB onFileLoaded={(e) => dispatch(uploadImageB(e))} />
      </Grid>
    </React.Fragment>
  );
}

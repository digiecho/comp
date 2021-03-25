import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ImageUploadCard from "../ImageUploadA";
import ImageA from "../features/counter/ImageA";
import { uploadImage, selectImage } from "../features/counter/counterSlice";
import { useSelector, useDispatch } from "react-redux";

export default function BeforeForm() {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Before Image
      </Typography>

      <Grid container spacing={3} justify="center" alignItems="center">
        <ImageUploadCard onFileLoaded={(e) => dispatch(uploadImage(e))} />
      </Grid>
    </React.Fragment>
  );
}

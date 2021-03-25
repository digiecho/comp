import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    img: "",
    imgB: "",
    videoURL: "",
  },
  reducers: {
    uploadImage: (state, action) => {
      state.img += action.payload;
    },
    uploadImageB: (state, action) => {
      state.imgB += action.payload;
    },
    pushVideoURL: (state, action) => {
      state.videoURL += action.payload;
    },
  },
});

export const { uploadImage, uploadImageB, pushVideoURL } = slice.actions;

export const selectImage = (state) => state.counter.img;
export const selectImageB = (state) => state.counter.imgB;
export const getVideo = (state) => state.counter.videoURL;
export default slice.reducer;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage, selectImage } from "./counterSlice";
import styles from "./Counter.module.css";
import UploadFileV2 from "../../UploadFile";

export default function ImageA() {
  const dispatch = useDispatch();
  const image = useSelector(selectImage);

  return (
    <div>
      <div className={styles.row}>
        <UploadFileV2 onFileLoaded={(e) => dispatch(uploadImage(e))} />
      </div>
      <img src={image} alt="" width="200" />
    </div>
  );
}

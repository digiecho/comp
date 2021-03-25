import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadImageB, selectImageB } from "./counterSlice";
import styles from "./Counter.module.css";
import UploadFileV2 from "../../Uploadfile";

export function ImageB() {
  const dispatch = useDispatch();
  const imageb = useSelector(selectImageB);

  return (
    <div>
      <div className={styles.row}>
        <UploadFileV2 onFileLoaded={(e) => dispatch(uploadImageB(e))} />
      </div>
      <img src={imageb} alt="" width="200" />
    </div>
  );
}

"use client";
import React, { useState } from "react";
import styles from "@/styles/BookInfo.module.css";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";

const AddBookToCollection = () => {
  const [saved, setSaved] = useState(!true);

  function addBtnToggle() {
    saved === !true ? setSaved(true) : setSaved(!true);
  }


  return (
    <>
      <div className={styles.inner_book__bookmark}>
        <div className={styles.inner_book__readIcon}>
          {saved === true ? <FaBookmark /> : <FaRegBookmark />}
        </div>
        <button className={styles.inner_book__readText} onClick={addBtnToggle}>
          {saved === true ? "Saved in My Library" : "Add title to my Library"}
        </button>
      </div>
    </>
  );
};

export default AddBookToCollection;

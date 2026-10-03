'use client'
import AddBookToCollection from "@/components/bookInfoSections/AddBookToCollection";
import styles from "@/styles/MyLibrary.module.css";
import axios from "axios";
import { useState } from "react";

const MyLibrary = () => {



  
  return (
    <>
      <div className={styles.row}>
        <div className={styles.container}>
          <div className={styles.for_you__title}>Saved Books</div>
          <div className={styles.for_you__subTitle}>0 items</div>
          <div className={styles.finished_book__blockWrapper}>
            <div className={styles.finished_books__title}>
              Save your favorite books
            </div>
            <div className={styles.finished_book__subTitle}>
              When you save a book it will appear here.
              
            </div>
          </div>
          <div className={styles.for_you__title}>
            Finished
          </div>
          <div className={styles.for_you__subTitle}>0 items</div>
          <div className={styles.finished_book__blockWrapper}>
            <div className={styles.finished_books__title}>
              Done and dusted!
            </div>
            <div className={styles.finished_books__subTitle}>
              When you finish a book you can find it here later.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyLibrary;

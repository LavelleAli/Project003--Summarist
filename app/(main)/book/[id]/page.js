import React from "react";
import styles from "@/styles/ForYou.module.css";
import bookStyles from "@/styles/BookInfo.module.css";
import BookBasicInfo from "@/components/bookInfoSections/BookBasicInfo";
import BookAbout from "@/components/bookInfoSections/BookAbout";
import BookImage from "@/components/bookInfoSections/BookImage";
import AddBookToCollection from "@/components/bookInfoSections/AddBookToCollection";


const bookInfoPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
    { next: { revalidate: 3600 } },
  );
  const book = await res.json();
 

  return (
    <>
      <div className={styles.row}>
        <div className={styles.container}>
          <div className={bookStyles.innerBookWrapper}>
            <div className={bookStyles.innerBook}>
              <BookBasicInfo book={book} />
              <AddBookToCollection book={book}/>
              <BookAbout book={book} />
            </div>
            <BookImage book={book} />
          </div>
        </div>
      </div>
    </>
  );
};

export default bookInfoPage;

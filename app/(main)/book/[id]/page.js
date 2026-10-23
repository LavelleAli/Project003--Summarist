import React from "react";
import { notFound } from "next/navigation";
import styles from "@/styles/ForYou.module.css";
import bookStyles from "@/styles/BookInfo.module.css";
import BookBasicInfo from "@/components/bookInfoSections/BookBasicInfo";
import BookAbout from "@/components/bookInfoSections/BookAbout";
import BookImage from "@/components/bookInfoSections/BookImage";
import AddBookToCollection from "@/components/bookInfoSections/AddBookToCollection";
import { getBook } from "@/lib/books";


const bookInfoPage = async ({ params }) => {
  const { id } = await params;
  const book = await getBook(id);
  if (!book) notFound();


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

import styles from "@/styles/ForYou.module.css";
import bookStyles from "@/styles/BookInfo.module.css";
import BookBasicInfoSkeleton from "@/components/bookInfoSections/BookBasicInfoSkeleton";
import BookAboutSkeleton from "@/components/bookInfoSections/BookAboutSkeleton";
import BookImageSkeleton from "@/components/bookInfoSections/BookImageSkeleton";
import AddBookToCollectionSkeleton from "@/components/bookInfoSections/AddBookToCollectionSkeleton";

const BookLoading = () => {
  return (
    <>
      <div className={styles.row}>
        <div className={styles.container}>
          <div className={bookStyles.innerBookWrapper}>
            <div className={bookStyles.innerBook}>
              <BookBasicInfoSkeleton />
              <AddBookToCollectionSkeleton />
              <BookAboutSkeleton />
            </div>
            <BookImageSkeleton />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookLoading;

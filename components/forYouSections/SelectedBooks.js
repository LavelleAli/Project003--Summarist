"use client";
import styles from "@/styles/ForYou.module.css";
import Image from "next/image";
import { FaCirclePlay } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { openModal } from "@/redux/slices/loginModal";

const SelectedBooks = ({ book }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const premiumUser = useSelector((state) => state.auth.isPremium);

  function renderHelper(booksInfo) {
    return (
      <>
        <div className={styles.for_you__title}>Selected just for you</div>
        <audio src={booksInfo?.audioLink}>Audio Link</audio>
        <a
          className={styles.selected__book}
          href={`/book/${booksInfo?.id}`}
          onClick={(e) => {
            e.preventDefault();
            if (!user) return dispatch(openModal());
            booksInfo?.subscriptionRequired && premiumUser !== true
              ? router.push("/choose-plan")
              : router.push(`/book/${booksInfo.id}`);
          }}
        >
          <div className={styles.selected__book__subTitle}>
            <p className={styles.sub_text}>{booksInfo?.subTitle}</p>
          </div>
          <div className={styles.selected__book__line}></div>
          <div className={styles.selected__book__content}>
            <figure className={styles.book_image__wrapper}>
              <Image
                src={booksInfo?.imageLink}
                className={styles.book_image}
                width={200}
                height={200}
                alt="img"
              />
            </figure>
            <div className={styles.selected_book__text}>
              <div className={styles.selected_book__title}>
                {booksInfo?.title}
              </div>
              <div className={styles.selected_book__author}>
                {booksInfo?.author}
              </div>
              <div className={styles.selected_book__durationWrapper}>
                <div className={styles.selected_book__icon}>
                  <FaCirclePlay className={styles.playCircleStyle} />
                </div>
                <div className={styles.selected_book__duration}>
                  {" "}
                  3 mins 23 secs
                </div>
              </div>
            </div>
          </div>
        </a>
      </>
    );
  }

  return <>{book && renderHelper(book)}</>;
};

export default SelectedBooks;

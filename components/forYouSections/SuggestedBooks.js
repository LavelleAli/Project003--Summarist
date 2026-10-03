"use client";
import React from "react";
import styles from "@/styles/ForYou.module.css";
import Image from "next/image";
import { FaRegClock, FaRegStar } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { openModal } from "@/redux/slices/loginModal";

const SuggestedBooks = ({ suggestedBooks }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const premiumUser = useSelector((state) => state.auth.isPremium);

  function renderHelper(item) {
    return (
      <a
        href={`/book/${item?.id}`}
        className={styles.for_you__recommendedBooks_link}
        key={item?.id}
        onClick={(e) => {
          e.preventDefault();
          if (!user) return dispatch(openModal());
          item?.subscriptionRequired && premiumUser !== true
            ? router.push("/choose-plan")
            : router.push(`/book/${item.id}`);
        }}
      >
        <div
          className={`${styles.book_pill} ${
            item?.subscriptionRequired === true
              ? styles.book_pill__subscriptionRequired
              : ""
          }`}
        >
          {item?.subscriptionRequired === true ? "Premium" : null}
        </div>
        <audio src={item?.audioLink}>Audio Link</audio>
        <figure className={styles.book_image__wrapper}>
          <Image
            src={item?.imageLink}
            className={styles.book_image}
            alt="img"
            width={300}
            height={300}
          />
        </figure>
        <div className={styles.recommended_book__title}>{item?.title}</div>
        <div className={styles.recommended_book__author}>{item?.author}</div>
        <div className={styles.recommended_book__subTitle}>
          {item?.subTitle}
        </div>
        <div className={styles.recommended_book__detailsWrapper}>
          <div className={styles.recommended_book__details}>
            <div className={styles.recommended_book__detailsIcon}>
              <FaRegClock />
            </div>
            <div className={styles.recommended_book__detailsText}>03:24</div>
          </div>
          <div className={styles.recommended_book__details}>
            <div className={styles.recommended_book__detailsIcon}>
              <FaRegStar />
            </div>
            <div className={styles.recommended_book__detailsText}>
              {Math.max(item?.averageRating)}
            </div>
          </div>
        </div>
      </a>
    );
  }

  return (
    <>
      <div>
        <div className={styles.for_you__title}>Suggested Books</div>
        <div className={styles.recommended_book__detailsText}></div>{" "}
        <div className={styles.for_you__subTitle}>Browse those books</div>
        <div className={styles.for_you__recommendedBooks}>
          {suggestedBooks.map((item) => {
            return renderHelper(item);
          })}
        </div>
      </div>
    </>
  );
};

export default SuggestedBooks;

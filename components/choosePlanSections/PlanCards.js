"use client";
import React, { useState } from "react";
import styles from "@/styles/ChoosPlane.module.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getCheckoutUrl } from "@/firebase/firebase";
import { openModal } from "@/redux/slices/loginModal";


const PRICE_IDS = {
  yearly: "price_1ToUawCdxm2PHSxyNlmReMph",
  monthly: "price_1ToUbqCdxm2PHSxyynLYPjti",
};

const PlanCards = () => {
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    if (!user) return dispatch(openModal());
    setIsRedirecting(true);
    try {
      const checkoutUrl = await getCheckoutUrl(PRICE_IDS[selectedPlan]);
      // Stripe checkout is on another site, so leave the app with a full page load
      window.location.assign(checkoutUrl);
    } catch (error) {
      console.log("Checkout failed", error);
      toast.error("Could not start checkout, please try again");
      setIsRedirecting(false);
    }
  };

  return (
    <>
      <div className={styles.section_title}>Choose the plan that fits you</div>
      <div
        className={`${styles.plan_card} ${
          selectedPlan === "yearly" ? styles.plan_card__active : ""
        }`}
      >
        <div className={styles.plan_card__circle} onClick={() => setSelectedPlan("yearly")}>
          {selectedPlan === "yearly" && <div className={styles.plan_card__dot}></div>}
        </div>
        <div className={styles.plan_card__content}>
          <div className={styles.plan_card__title}>Premium Plus Yearly</div>
          <div className={styles.plan_card__price}>$99.99/year</div>
          <div className={styles.plan_card__text}>
            7-day free trial included
          </div>
        </div>
      </div>
      <div className={styles.plan_card__seperator}>
        <div className={styles.plan_seperator}>or</div>
      </div>
      <div
        className={`${styles.plan_card} ${
          selectedPlan === "monthly" ? styles.plan_card__active : ""
        }`}
      >
        <div className={styles.plan_card__circle} onClick={() => setSelectedPlan("monthly")}>
          {selectedPlan === "monthly" && <div className={styles.plan_card__dot}></div>}
        </div>
        <div className={styles.plan_card__content}>
          <div className={styles.plan_card__title}>Premium Monthly</div>
          <div className={styles.plan_card__price}>$9.99/month</div>
          <div className={styles.plan_card__text}>No trial included</div>
        </div>
      </div>
      <div className={styles.plan_card__cta}>
        <span className={styles.btn_wrapper}>
          <button className={styles.btn} onClick={handleCheckout} disabled={isRedirecting}>
            {isRedirecting && <span>Redirecting...</span>}
            {!isRedirecting && selectedPlan === "monthly" && <span>Start your first month</span>}
            {!isRedirecting && selectedPlan === "yearly" && <span>Start your free 7-day trial</span>}
          </button>
        </span>
        <div className={styles.plan_disclaimer}></div>
      </div>
    </>
  );
};

export default PlanCards;

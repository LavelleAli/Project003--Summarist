'use client'
import { useState, useRef, useLayoutEffect } from "react";
import styles from '@/styles/ChoosPlane.module.css'
import { IoIosArrowUp } from "react-icons/io";

const FAQSection = () => {

  const [openIndex, setOpenIndex] = useState(null)
  const [bodyHeights, setBodyHeights] = useState([])
  const bodyRefs = useRef([])

  // Re-measure on resize, since answers wrap onto more lines on narrower screens
  useLayoutEffect(() => {
    const measure = () => setBodyHeights(bodyRefs.current.map(el => el?.scrollHeight ?? 0))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  function toggleAccordion(index) {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  const faqs = [
    {
      title: "How does the free 7-day trial work?",
      body: `Begin your complimentary 7-day trial with a Summarist annual
              membership. You are under no obligation to continue your
              subscription, and you will only be billed when the trial period
              expires. With Premium access, you can learn at your own pace and
              as frequently as you desire, and you may terminate your
              subscription prior to the conclusion of the 7-day free trial.`,
    },
    {
      title: "Can I switch subscription from monthly to yearly, or yearly to monthly?",
      body: `While an annual plan is active, it is not feasible to switch to a
              monthly plan. However, once the current month ends, transitioning
              from a monthly plan to an annual plan is an option.`,
    },
    {
      title: "Whats included in the Premium plan?",
      body: `Premium membership provides you with the ultimate Summarist
              experience, including unrestricted entry to many best-selling
              books high-quality audio, the ability to download titles for
              offline reading, and the option to send your reads to your Kindle.`,
    },
    {
      title: "Can I cancel during my trial or subscription?",
      body: `You will not be charged if you cancel your trial before its
              conclusion. While you will not have complete access to the entire
              Summarist library, you can still expand your knowledge with one
              curated book per day.`,
    },
  ]

  return (
    <>
      <div className={styles.faq_wrapper}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div className={styles.accordion_card} key={faq.title}>
              <div className={styles.accordion_header} onClick={() => toggleAccordion(index)}>
                <div className={styles.accordion_title}>{faq.title}</div>
                <IoIosArrowUp
                  className={`${styles.accordion_icon} ${isOpen ? styles.accordion_icon__rotate : ''}`}
                />
              </div>
              <div
                className={styles.collapse}
                style={{ height: isOpen ? bodyHeights[index] : 0 }}
              >
                <div className={styles.accordion_body} ref={el => (bodyRefs.current[index] = el)}>
                  {faq.body}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
};

export default FAQSection;

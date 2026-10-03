import React from "react";
import styles from  '@/styles/ChoosPlane.module.css';

const FooterSection = () => {
  return (
    <>
      <section id={styles.footer}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.footer_top__wrapper}>
              <div className={styles.footer_block}>
                <div className={styles.footer_link_title}>Actions</div>
                <div>
                  <div className={styles.footer_link__wrapper}>
                    <a className={styles.footer_link} href="">Summarist Magazine</a>
                  </div>
                  <div className={styles.footer_link__wrapper}>
                    <a className={styles.footer_link} href="">Cancel Subscription</a>
                  </div>
                  <div className={styles.footer_link__wrapper}>
                    <a className={styles.footer_link} href="">Help</a>
                  </div>
                  <div className={styles.footer_link__wrapper}>
                    <a className={styles.footer_link} href="">Contact Us</a>
                  </div>
                </div>
              </div>
              <div className={styles.footer_block}>
                <div className={styles.footer_link_title}>Useful Links</div>
                <div>
                  <div className={styles.footer_link__wrapper}>
                    <a className={styles.footer_link} href="">Pricing</a>
                  </div>
                  <div className={styles.footer_link__wrapper}>
                    <a className={styles.footer_link} href="">Summarist Business</a>
                  </div>
                  <div className={styles.footer_link__wrapper}>
                    <a className={styles.footer_link} href="">Gift Cards</a>
                  </div>
                  <div className={styles.footer_link__wrapper}>
                    <a className={styles.footer_link} href="">Authors & Publishers</a>
                  </div>
                </div>
              </div>
              <div className={styles.footer_block}>
                <div className={styles.footer_link_title}>Company</div>
                <div>
                  <div className={styles.footer_link__wrapper}>
                    <a className={styles.footer_link} href="">About</a>
                  </div>
                  <div className={styles.footer_link__wrapper}>
                    <a className={styles.footer_link} href="">Careers</a>
                  </div>
                  <div className={styles.footer_link__wrapper}>
                    <a className={styles.footer_link} href="">Partners</a>
                  </div>
                  <div className={styles.footer_link__wrapper}>
                    <a className={styles.footer_link} href="">Code of Conduct</a>
                  </div>
                </div>
              </div>
              <div className={styles.footer_block}>
                <div className={styles.footer_link_title}>Other</div>
                <div>
                  <div className={styles.footer_link__wrapper}>
                    <a className={styles.footer_link} href="">Sitemap</a>
                  </div>
                  <div className={styles.footer_link__wrapper}>
                    <a className={styles.footer_link} href="">Legal Notice</a>
                  </div>
                  <div className={styles.footer_link__wrapper}>
                    <a className={styles.footer_link} href="">Terms of Service</a>
                  </div>
                  <div className={styles.footer_link__wrapper}>
                    <a className={styles.footer_link} href="">Privacy Policies</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.footer_copyright__wrapper}>
                <div className={styles.footer_copyright}> Copyright © 2026 Summarist</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FooterSection;

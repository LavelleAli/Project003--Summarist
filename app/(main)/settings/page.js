"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "@/styles/Settings.module.css";
import forYouStyles from "@/styles/ForYou.module.css";
import { getPortalUrl } from "@/firebase/firebase";
import Link from "next/link";
import Image from "next/image";
import LoginTrigger from "@/components/loginmodal/LoginTrigger";
import { useHasMounted } from "@/hooks/useHasMounted";
import Skeleton from "@/components/skeletons/Skeleton";

const Settings = () => {
  const user = useSelector((state) => state.auth.user);
  const initializing = useSelector((state) => state.auth.initializing);
  const hasMounted = useHasMounted();
  const isPremium = useSelector((state) => state.auth.isPremium);
  const isLoadingStatus = isPremium === null;
  const [isRedirecting, setIsRedirecting] = useState(false);
  const userEmail =
    user?.email ?? "No email account associated with this user";

  const handleManageSubscription = async () => {
    setIsRedirecting(true);
    try {
      const portalUrl = await getPortalUrl();
      window.location.href = portalUrl;
    } catch (error) {
      console.log("Could not open subscription portal", error);
      toast.error("Could not open subscription management, please try again");
      setIsRedirecting(false);
    }
  };

  return (
    <>
      <div className={forYouStyles.row}>
        <div className={forYouStyles.container}>
          <div className={styles.header}>
            <h1>Settings</h1>
          </div>
          <div className={styles.separator}></div>

          <div className={styles.card}>
            {!hasMounted || initializing ? (
              <div className={styles.login_wrapper}>
                <Skeleton height="500px" width="500px" />
                <Skeleton height="16px" width="220px" />
                <Skeleton height="36px" width="100px" />
              </div>
            ) : (
              <>
                {!user && (
                  <>
                    <div className={styles.login_wrapper}>
                      <Image
                        className={styles.login_img}
                        src="/login.png"
                        alt="Login"
                        width={500}
                        height={500}
                      />
                      <div className={styles.email}>
                        Log in to see your account details.
                      </div>
                      <LoginTrigger className={styles.btn}>Login</LoginTrigger>
                    </div>
                  </>
                )}
                {user && (
                  <>
                    {isLoadingStatus && (
                      <div className={styles.status}>Checking subscription...</div>
                    )}

                    <div className={styles.top_card}>Your Subscription Plan</div>
                    {!isLoadingStatus && (
                      <div
                        className={`${styles.status} ${isPremium ? styles.status__premium : styles.status__standard}`}
                      >
                        {isPremium ? "Premium" : "Basic"}
                      </div>
                    )}

                    <div className={styles.actions}>
                      {!isLoadingStatus && isPremium && (
                        <button
                          className={`${styles.btn} ${styles.btn__action}`}
                          onClick={handleManageSubscription}
                          disabled={isRedirecting}
                        >
                          {isRedirecting ? "Redirecting..." : "Manage Subscription"}
                        </button>
                      )}
                      {!isLoadingStatus && !isPremium && (
                        <Link href={`/choose-plan`}>
                          <button className={`${styles.btn} ${styles.btn__action}`}>Upgrade To Premium</button>
                        </Link>
                      )}
                    </div>
                    <div className={styles.separator}></div>
                    <div className={styles.top_card}>
                      <h1>Email</h1>
                    </div>
                    {userEmail}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;

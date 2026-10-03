"use client";
import { useState } from "react";
import LoginTrigger from "@/components/loginmodal/LoginTrigger";
import LoginModalGate from "@/components/loginmodal/LoginModalGate";
import Logout from "@/components/loginmodal/Logout";
import { useSelector } from "react-redux";
import styles from "@/styles/ForYou.module.css";
import {
  FaRegBookmark,
  FaRegCircleQuestion,
  FaArrowRightFromBracket,
} from "react-icons/fa6";
import { GoGear } from "react-icons/go";
import { RiBallPenLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { RxMagnifyingGlass, RxHamburgerMenu } from "react-icons/rx";
import { CiClock2 } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import { openModal } from "@/redux/slices/loginModal";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { useHasMounted } from "@/hooks/useHasMounted";
import Skeleton from "@/components/skeletons/Skeleton";

const SideAndSearchBar = () => {
  const user = useSelector((state) => state.auth.user);
  const initializing = useSelector((state) => state.auth.initializing);
  const hasMounted = useHasMounted();
  const dispatch = useDispatch();
  const router = useRouter();
  // The player page has an audio bar at the bottom, so the sidebar is shorter there.
  const inPlayer = usePathname()?.startsWith("/player");
  const premiumUser = useSelector((state) => state.auth.isPremium);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function simpleSearch(e) {
    const searchTerm = e.target.value.trim();
    setSearch(searchTerm);
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    try {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(searchTerm)}`,
      );
      const data = await res.json();
      setSearchResults(data);
      console.log(data);
    } catch (error) {
      console.log("Error fetching Data:", error);
    }
  }

  function searchBarRenderHelper() {
    return (
      <>
        {searchResults.map((book) => {
          return (
            <div
              className={styles.search_books__wrapper}
              key={book.id}
            >
              <div
                className={styles.search_book__link}
                onClick={() => {
                  if (!user) return dispatch(openModal());
                  book?.subscriptionRequired && premiumUser !== true
                    ? router.push("/choose-plan")
                    : router.push(`/book/${book.id}`);
                }}
              >
                <audio src={book.audioLink}></audio>
                <figure className={styles.book_img__wrapper}>
                  <Image
                    className={styles.book_img}
                    src={book.imageLink}
                    alt="image not available"
                    width={300}
                    height={300}
                  />
                </figure>
                <div>
                  <div className={styles.search_book__title}>{book.title}</div>
                  <div className={styles.search_book__author}>
                    {book.author}
                  </div>
                  <div className={styles.search_book__duration}>
                    <div className={styles.recommended_book__details}>
                      <div className={styles.recommended_book__detailsIcon}>
                        <CiClock2 />
                      </div>
                      <div className={styles.recommended_book__detailsText}>
                        03:24
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className={inPlayer ? styles.sideBar_inPlayer : undefined}>
      <LoginModalGate />
      <div className={styles.search_background}>
        <div className={styles.search_wrapper}>
          <figure></figure>
          <div className={styles.search_content}>
            <div className={styles.search}>
              <div className={styles.search_input__wrapper}>
                <input
                  className={styles.search_input}
                  type="text"
                  placeholder="Search for books"
                  onChange={(e) => {
                    simpleSearch(e)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      simpleSearch(e);
                    }
                  }}
                />
                <div className={styles.search_icon}>
                  <RxMagnifyingGlass className={styles.react_icon} />
                </div>
              </div>
              <button
                type="button"
                className={styles.hamburger_btn}
                onClick={() => setSidebarOpen((prev) => !prev)}
                aria-label="Toggle navigation menu"
              >
                <RxHamburgerMenu className={styles.react_icon} />
              </button>
            </div>
          </div>
          {searchResults && searchBarRenderHelper()}
        </div>
      </div>
      {sidebarOpen && (
        <div
          className={styles.sidebar_backdrop}
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <div className={`${styles.sideBar} ${sidebarOpen ? styles.sideBar_open : ""}`}>
        <div className={styles.sideBar_logo}>
          <Image src="/logo.png" alt="logo" width={200} height={200} />
        </div>
        <div className={styles.sideBar__wrapper}>
          <div className={styles.sideBar__top}>
            <Link
              className={styles.sideBar_link__wrapper}
              href="/for-you"
              onClick={() => setSidebarOpen(false)}
            >
              <div
                className={`${styles.sideBar_link__line} ${styles.active__tab}`}
              ></div>
              <div className={styles.sideBar_icon_wrapper}>
                <AiOutlineHome className={styles.react_icon__sidebar} />
              </div>
              <div className={styles.sideBar_link__text}>For you</div>
            </Link>

            <div className={styles.sideBar_link__wrapper}>
              <div className={styles.sideBar_link__line}></div>
              <div className={styles.sideBar_icon_wrapper}>
                <FaRegBookmark className={styles.react_icon__sidebar} />
              </div>
              <Link href={"/my-library"} onClick={() => setSidebarOpen(false)}>
                <div className={styles.sideBar_link__notAllowed}>My Library</div>
              </Link>
            </div>

            <div
              className={`${styles.sideBar_link__wrapper} ${styles.sideBar_link__notAllowed}`}
            >
              <div className={styles.sideBar_link__line}></div>
              <div className={styles.sideBar_icon_wrapper}>
                <RiBallPenLine className={styles.react_icon__sidebar} />
              </div>
              <div className={styles.sideBar_link__textNA}>HighLights</div>
            </div>
            <div
              className={`${styles.sideBar_link__wrapper} ${styles.sideBar_link__notAllowed}`}
            >
              <div className={styles.sideBar_link__line}></div>
              <div className={styles.sideBar_icon_wrapper}>
                <RxMagnifyingGlass className={styles.react_icon__sidebar} />
              </div>
              <div className={styles.sideBar_link__textNA}>Search</div>
            </div>
          </div>
          <div className={styles.sideBar__bottom}>
            <Link
              className={styles.sideBar_link__wrapper}
              href="/settings"
              onClick={() => setSidebarOpen(false)}
            >
              <div className={styles.sideBar_link__line}></div>
              <div className={styles.sideBar_icon_wrapper}>
                <GoGear className={styles.react_icon__sidebar} />
              </div>
              <div className={styles.sideBar_link__text}>Settings</div>
            </Link>

            <div
              className={`${styles.sideBar_link__wrapper} ${styles.sideBar_link__notAllowed}`}
            >
              <div className={styles.sideBar_link__line}></div>
              <div className={styles.sideBar_icon_wrapper}>
                <FaRegCircleQuestion className={styles.react_icon__sidebar} />
              </div>
              <div className={styles.sideBar_link__textNA}>Help & Support</div>
            </div>

            <a
              className={`${styles.sideBar_link__wrapper}`}
              onClick={() => setSidebarOpen(false)}
            >
              <div className={styles.sideBar_link__line}></div>
              <div className={styles.sideBar_icon_wrapper}>
                <FaArrowRightFromBracket
                  className={styles.react_icon__sidebar}
                />
              </div>

              {!hasMounted || initializing ? (
                <Skeleton height="16px" width="60px" />
              ) : user ? (
                <Logout className={styles.sideBar_link__text} />
              ) : (
                <LoginTrigger className={styles.sideBar_link__text}>
                  Login
                </LoginTrigger>
              )}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideAndSearchBar;

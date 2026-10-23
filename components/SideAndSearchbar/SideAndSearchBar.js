"use client";
import { useEffect, useState } from "react";
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
  const pathname = usePathname();

  const inPlayer = pathname?.startsWith("/player");
  const premiumUser = useSelector((state) => state.auth.isPremium);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchTerm = search.trim();
  const visibleResults = searchTerm ? searchResults : [];

  useEffect(() => {
    if (!searchTerm) return;
    let ignore = false;
    // Wait until the user pauses typing instead of searching on every keystroke
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(searchTerm)}`,
        );
        if (!res.ok) throw new Error(`Search failed with status ${res.status}`);
        const data = await res.json();
        // Skip responses for a term the user has already typed past
        if (!ignore) setSearchResults(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Error fetching Data:", error);
      }
    }, 300);
    return () => {
      ignore = true;
      clearTimeout(timeout);
    };
  }, [searchTerm]);

  function searchBarRenderHelper() {
    return (
      <>
        {visibleResults.map((book) => {
          return (
            <div
              className={styles.search_books__wrapper}
              key={book.id}
            >
              <div
                className={styles.search_book__link}
                onClick={() => {
                  if (!user) return dispatch(openModal());
                  setSearch("");
                  book?.subscriptionRequired && premiumUser !== true
                    ? router.push("/choose-plan")
                    : router.push(`/book/${book.id}`);
                }}
              >
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
          {searchBarRenderHelper()}
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
                className={`${styles.sideBar_link__line} ${pathname === "/for-you" ? styles.active__tab : ""}`}
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
              <div
                className={`${styles.sideBar_link__line} ${pathname === "/settings" ? styles.active__tab : ""}`}
              ></div>
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

            <div
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideAndSearchBar;

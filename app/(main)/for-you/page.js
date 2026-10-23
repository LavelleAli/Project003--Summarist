import styles from "@/styles/ForYou.module.css";
import SelectedBooks from "@/components/forYouSections/SelectedBooks";
import RecommendedBooks from "@/components/forYouSections/RecommendedBooks";
import SuggestedBooks from "@/components/forYouSections/SuggestedBooks";
import { getBooks } from "@/lib/books";


async function ForYou() {

  const [selectedBooks, recommendedBooks, suggestedBooks] = await Promise.all([
    getBooks("selected"),
    getBooks("recommended"),
    getBooks("suggested"),
  ]);

  return (
    <>
      <div className={styles.row}>
        <div className={styles.container}>
          <div className={styles.for_you__wrapper}>
            <SelectedBooks book={selectedBooks[0]} />
            <RecommendedBooks recBooks={recommendedBooks} />
            <SuggestedBooks suggestedBooks={suggestedBooks} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ForYou;

import styles from "@/styles/ForYou.module.css";
import SelectedBooks from "@/components/forYouSections/SelectedBooks";
import RecommendedBooks from "@/components/forYouSections/RecommendedBooks";
import SuggestedBooks from "@/components/forYouSections/SuggestedBooks";


const CACHE_1H = { next: { revalidate: 3600 } };

async function ForYou() {

  const [selectedRes, recommendedRes, suggestedRes] = 
  await Promise.all([
    fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected", CACHE_1H),
    fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended", CACHE_1H),
    fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested", CACHE_1H),
  ]);

  const [selectedBooks, recommendedBooks, suggestedBooks] = await Promise.all([
    selectedRes.json(), recommendedRes.json(), suggestedRes.json(),
  ])

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

# Summarist

Summarist is a book-summary web app: browse curated titles, read a summary or listen to it, and unlock premium books with a subscription. It was built as part of the Frontend Simplified (FES) Advanced Virtual Internship.

## Features

- **Landing page** with a login and sign-up modal
- **Authentication** with Firebase: email and password, Google, guest login, and password reset
- **For You page** with Selected, Recommended and Suggested books
- **Search** by title or author, debounced as you type
- **Book pages** with ratings, key ideas, tags and a description
- **Audio player** with play and pause, 10-second skip, a progress bar and volume control
- **Premium subscriptions** through Stripe (Firebase Stripe extension), with yearly and monthly plans and a 7-day trial on yearly
- **Access control**: premium books send free users to the plans page, including when opened directly by URL
- **Live subscription status**: premium unlocks as soon as checkout finishes, with no refresh needed
- **Settings page** showing the plan and email, with a link to manage the subscription
- **Loading skeletons** and responsive layouts for mobile screens

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 with the React Compiler |
| State | Redux Toolkit, React Redux |
| Backend | Firebase Auth, Cloud Firestore, Cloud Functions |
| Payments | Stripe, through the Firebase "Run Payments with Stripe" extension |
| Styling | CSS Modules, Tailwind CSS 4 |
| UI | react-icons, Font Awesome, react-toastify |

Book data comes from the Summarist API on Cloud Functions (`getBook`, `getBooks`, `getBooksByAuthorOrTitle`) and is cached for one hour.

## Getting started

You need Node.js 20 or newer.

```bash
git clone https://github.com/LavelleAli/Lavelle-advance-virtual-internship.git
cd Lavelle-advance-virtual-internship
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm start` | Run the production build |
| `npm run lint` | Run ESLint |

### Using your own Firebase project

The app is connected to the project's Firebase backend in `firebase/firebase.js`. To use your own:

1. Create a Firebase project and enable **Authentication** (Email/Password, Google and Anonymous) and **Cloud Firestore**.
2. Install the **Run Payments with Stripe** extension and create a yearly and a monthly price in Stripe.
3. Replace `firebaseConfig` in `firebase/firebase.js` with your project's config.
4. Replace the price IDs in `PRICE_IDS` in `components/choosePlanSections/PlanCards.js`.

## Project structure

```
app/
  page.js               Landing page
  choose-plan/          Subscription plans and checkout
  (main)/               Pages that share the sidebar and search bar
    for-you/            Home feed
    book/[id]/          Book details
    player/[id]/        Summary and audio player
    my-library/         Saved and finished books
    settings/           Account and subscription
components/             UI, split into folders by page or feature
firebase/firebase.js    Auth, Firestore and Stripe checkout helpers
lib/books.js            Book API requests
redux/                  Store plus auth and login-modal slices
hooks/                  Shared hooks
styles/                 CSS modules
public/                 Images and audio
```

## Status

- **In progress:** My Library. Saving books to the library is not working yet, and the page currently shows empty placeholders.
- **Not yet built:** the sidebar's Highlights and Help & Support links.

## Acknowledgements

Built for the [Frontend Simplified](https://frontendsimplified.com) Advanced Virtual Internship. The book data and Summarist design come from the internship materials.

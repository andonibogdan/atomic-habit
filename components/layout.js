import Nav from "./Nav";
import Head from "next/head";

export default function Layout({ childeren }) {
  return (
    <>
      <Head>
        <title>Atomic Habit</title>
        <meta
          name="description"
          content="Based on Atomic Habits by James Clear"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-14">
        <Nav />
        {childeren}
      </main>
      <footer className="text-center mb-2">
        ©Atomic Habit™. All Rights Reserved.
      </footer>
    </>
  );
}

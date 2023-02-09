/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Typewriter from "typewriter-effect";

export default function Home() {
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
      <main className="md:mx-24">
        <div className="text-center">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Tiny Changes, Remarkable Results")
                .pauseFor(1500)
                .deleteAll()
                .typeString("Atomic Habit: The app that builds your habits")
                .start();
            }}
            options={{
              wrapperClassName: "Typewriter__wrapper",
              cursorClassName: "Typewriter__cursor",
            }}
          />
        </div>
        <img
          alt="..."
          src="/atomic-bg.webp"
          width={300}
          height={300}
          className="mx-auto my-12"
          priority
        />
        <h3 className="text-xl text-center mt-8">
          Atomic Habit is a task managment application that helps you create
          good habits, break bad ones, and get things done. It is simple but
          powerful.
        </h3>
      </main>
      <footer className="w-full h-16 fixed left-0 bottom-0 flex justify-center items-center text-ml">
        ©Atomic Habit™. All Rights Reserved.
      </footer>
    </>
  );
}

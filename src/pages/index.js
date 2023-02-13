/* eslint-disable @next/next/no-img-element */

import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <>
      <div className="md:mx-24">
        <div className="text-center h-36">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Tiny Changes, Remarkable Results")
                .pauseFor(1500)
                .deleteAll()
                .typeString("Atomic Habit: build your habits")
                .start();
            }}
            options={{
              wrapperClassName: "Typewriter__wrapper",
              cursorClassName: "Typewriter__cursor",
              delay: "100",
            }}
          />
        </div>
        <img
          alt="..."
          src="/atomic-bg.webp"
          width={300}
          height={300}
          className="mx-auto my-4 rotate"
          loading="lazy"
        />
        <h3 className="text-xl text-center my-8">
          Atomic Habit is a task managment application that helps you create
          good habits, break bad ones, and get things done. It is simple but
          powerful.
        </h3>
      </div>
    </>
  );
}

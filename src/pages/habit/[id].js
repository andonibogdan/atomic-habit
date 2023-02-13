import { useRouter } from "next/router";
import { auth } from "utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteLog, getLogs, postLogs } from "utils/firestore";
import { useState, useEffect, useRef } from "react";
import LogedCard from "components/LogedCard";
import Link from "next/link";

const HabitLog = () => {
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const formRef = useRef();
  const { id } = router.query;

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  const handleSumbitLog = (e) => {
    e.preventDefault();
    postLogs(
      user.uid,
      {
        hours: Number(formRef.current[0].value),
        text: formRef.current[1].value,
      },
      id
    )
      .then(() => {
        refreshData();
      })
      .then(() => clearForm())
      .catch((error) => console.log(error));
  };

  const clearForm = () => {
    formRef.current[0].value = "";
    formRef.current[1].value = "";
  };

  const refreshData = () => {
    if (user?.uid) {
      getLogs(user?.uid, id)
        .then((res) => setLogs(res))
        .catch((error) => console.log(error));
    }
  };

  const handleDelete = (log) => {
    deleteLog(
      user.uid,
      {
        hours: log.hours,
        text: log.text,
      },
      id
    )
      .then(() => {
        refreshData();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8 md:mx-24">
        {showLogs ? (
          logs.length > 0 &&
          logs.map((log, index) => {
            return (
              <LogedCard
                key={index}
                id={index}
                hours={log.hours}
                text={log.text}
                handleDelete={() => handleDelete(log)}
              />
            );
          })
        ) : (
          <>
            <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mx-auto">
              <form
                className="space-y-6"
                onSubmit={handleSumbitLog}
                ref={formRef}
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                  Atomic Habit {+id + 1}
                </h5>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    console.log(hours)
                  </label>
                  <input
                    type="number"
                    min={1}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-black focus:border-black  focus-visible:focus:ring-black"
                    placeholder="Number of hours spend..."
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    console.log(&quot;text&quot;)
                  </label>
                  <textarea
                    placeholder="What you did..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black  block w-full p-2.5"
                    required
                  />
                </div>
                <button
                  type="sumbit"
                  className="relative inline-block px-4 py-2 font-medium group w-full"
                >
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                  <span className="relative text-black group-hover:text-white">
                    Log it
                  </span>
                </button>
              </form>
            </div>
            <div className="p-6 w-full bg-white border border-gray-200 rounded-lg shadow mx-auto">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                Keep track of your logs
              </h5>
              <p className="mb-3 font-normal text-gray-700 ">
                Here you can see your progress by pressing the button bellow.
              </p>
              <button
                onClick={() => setShowLogs(true)}
                className="relative inline-block px-4 py-2 font-medium group"
              >
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                <span className="relative text-black group-hover:text-white">
                  Show logs
                </span>
              </button>
            </div>
          </>
        )}
      </div>
      {showLogs && (
        <button
          onClick={() => setShowLogs(false)}
          className="relative inline-flex items-center justify-center p-4 px-4 py-2 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-black rounded-full shadow-md group mx-auto md:mx-24 my-4 w-full md:w-fit"
          type="button"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full bg-black-500 group-hover:translate-x-0 ease">
            <svg
              className="w-6 h-6 rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease ">
            Go back
          </span>
          <span className="relative invisible">Go back</span>
        </button>
      )}
      {!showLogs && (
        <Link
          href="/dashboard"
          className="relative inline-flex items-center justify-center p-4 px-4 py-2 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-black rounded-full shadow-md group mx-auto md:mx-24 my-4 w-full md:w-fit "
          type="button"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full bg-black-500 group-hover:translate-x-0 ease">
            <svg
              className="w-6 h-6 rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease ">
            Back to dashboard
          </span>
          <span className="relative invisible">Back to dashboard</span>
        </Link>
      )}
    </>
  );
};

export default HabitLog;

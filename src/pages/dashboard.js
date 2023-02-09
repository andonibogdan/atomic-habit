import { auth } from "utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Form from "components/Form";
import { Table } from "components/Table";
import { getHabits } from "utils/firestore";

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [inputHabits, setInputHabits] = useState([]);
  const route = useRouter();

  const refreshData = () => {
    if (user?.uid) {
      getHabits(user.uid)
        .then((res) => setInputHabits(res))
        .catch((error) => console.log(error));
    } else {
      route.push("/auth/login");
    }
  };

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  if (!user) {
    return null;
  }

  return (
    <div className="md:mx-24">
      {!loading && (
        <h4 className="text-2xl text-center">
          Welcome to you dashboard <br />
          <span className="font-bold">{user?.displayName.toUpperCase()}</span>
        </h4>
      )}
      <Form refreshData={refreshData} habits={inputHabits} />
      {inputHabits?.length > 0 && (
        <Table habits={inputHabits} refreshData={refreshData} />
      )}
      <button
        onClick={() => auth.signOut()}
        className="relative px-7 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group block md:mx-auto my-4 w-full md:w-fit"
      >
        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
          Sign out
        </span>
      </button>
    </div>
  );
}

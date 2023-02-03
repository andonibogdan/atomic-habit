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
  }, [user?.uid, route]);

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
        className="block mx-auto mt-20 text-white w-[100px] h-[40px]  font-medium rounded-lg bg-red-500"
      >
        Sign out
      </button>
    </div>
  );
}

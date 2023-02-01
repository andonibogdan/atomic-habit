import React from "react";
import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { postHabit } from "utils/firestore";
import { auth } from "utils/firebase";

const Form = ({ refreshData, habits }) => {
  const [user, loading] = useAuthState(auth);
  const formRef = useRef();

  const handleSumbit = (e) => {
    e.preventDefault();
    const habitTitles = habits?.map((habit) => habit.title);

    if (formRef.current[0].value) {
      if (habitTitles?.includes(formRef.current[0].value)) {
        alert("Habit already exist");
        formRef.current[0].value = "";
      } else {
        postHabit(user.uid, { title: formRef.current[0].value })
          .then(() => {
            refreshData();
          })
          .then(() => (formRef.current[0].value = ""))
          .catch((error) => console.log(error));
      }
    }
  };

  return (
    <form className="relative my-6" onSubmit={handleSumbit} ref={formRef}>
      <input
        type="text"
        id="add-habit"
        className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-500 block w-full p-2"
        placeholder="Add a new habit..."
        required
        maxLength={120}
      />
      <button className="block mx-auto my-2 text-[#9fa7b3] absolute right-[0.8rem] -translate-y-[2.5rem] text-ml hover:text-green-500 font-bold">
        +
      </button>
    </form>
  );
};

export default Form;

import React from "react";
import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { postHabit } from "utils/firestore";
import { auth } from "utils/firebase";

const Form = ({ refreshData, habits }) => {
  const [user, loading] = useAuthState(auth);
  const formRef = useRef();

  const clearForm = () => {
    formRef.current[0].value = "";
    formRef.current[1].value = "";
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    const habitTitles = habits?.map((habit) => habit.title);

    if (formRef.current[0].value) {
      if (habitTitles?.includes(formRef.current[0].value)) {
        alert("Habit already exist");
        clearForm();
      } else {
        postHabit(user.uid, {
          title: formRef.current[0].value,
          hours: Number(formRef.current[1].value),
        })
          .then(() => {
            refreshData();
          })
          .then(() => clearForm())
          .catch((error) => console.log(error));
      }
    }
  };

  return (
    <form className="relative my-6" onSubmit={handleSumbit} ref={formRef}>
      <input
        type="text"
        id="add-habit"
        className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-500 block w-full p-2 active:bg-[#e7f0fe] valid:bg-[#e7f0fe]"
        placeholder="Add a new habit..."
        required
        maxLength={120}
      />
      <input
        type={"number"}
        id="add-hours"
        className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-teal-500 block w-full p-2 my-2 active:bg-[#e7f0fe] valid:bg-[#e7f0fe]"
        placeholder="How many hours..."
        required
        min="0"
        max="10000"
      />
      <button className="block mx-auto my-4 text-white w-[100px] h-[40px] font-medium rounded-lg bg-teal-500">
        Add Habit
      </button>
    </form>
  );
};

export default Form;

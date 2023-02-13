import React from "react";
import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { postHabit } from "utils/firestore";
import { auth } from "utils/firebase";
import Modal from "./Modal";

const Form = ({ refreshData, habits }) => {
  const [user, loading] = useAuthState(auth);
  const [showAlert, setShowAlert] = useState(false);
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
        setShowAlert(true);
        clearForm();
      } else {
        postHabit(user.uid, {
          title: formRef.current[0].value,
          hours: Number(formRef.current[1].value),
          logs: [],
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
    <div className="p-6 my-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
        Make a Habit
      </h5>
      <form className="relative my-4" onSubmit={handleSumbit} ref={formRef}>
        <input
          type="text"
          id="add-habit"
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black  focus-visible:focus:ring-black block w-full p-2 active:bg-[#e7f0fe] valid:bg-[#e7f0fe]"
          placeholder="Add a new habit..."
          required
          maxLength={120}
        />
        <input
          type={"number"}
          id="add-hours"
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black  focus-visible:focus:ring-black block w-full p-2 my-2 active:bg-[#e7f0fe] valid:bg-[#e7f0fe]"
          placeholder="How many hours..."
          required
          min="1"
          max="10000"
        />
        <button className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none w-full md:w-fit">
          Add habit
        </button>
        {showAlert && <Modal setShowAlert={setShowAlert} />}
      </form>
    </div>
  );
};

export default Form;

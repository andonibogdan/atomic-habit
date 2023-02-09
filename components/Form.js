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
        min="1"
        max="10000"
      />
      <button
        type="submit"
        className="relative block text- group md:mx-auto mt-4 w-full md:w-fit"
      >
        <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
          <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
          <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
          <span className="relative">Add habit</span>
        </span>
        <span
          className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
          data-rounded="rounded-lg"
        ></span>
      </button>
      {showAlert && <Modal setShowAlert={setShowAlert} />}
    </form>
  );
};

export default Form;

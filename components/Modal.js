import React from "react";

const Modal = ({ setShowAlert }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="relative p-6 flex-auto">
              <p className=" text-slate-500 text-lg leading-relaxed">
                You already work on this one. Try again with something else.
              </p>
            </div>
            <div className="flex items-center justify-end p-6">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none"
                type="button"
                onClick={() => setShowAlert(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;

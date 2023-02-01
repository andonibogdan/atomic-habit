import React from "react";
import { auth } from "utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteStudent } from "utils/firestore";

export const Table = ({ habits, refreshData }) => {
  const [user, loading] = useAuthState(auth);

  const handleDeleteHabit = async (habit) => {
    await deleteStudent(user.uid, { title: habit });
    refreshData();
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Number
            </th>
            <th scope="col" className="px-6 py-3">
              Habit
            </th>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {habits.map((habit, index) => {
            return (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{habit.title}</td>
                <td className="px-6 py-4 text-right">
                  <button className="font-medium text-blue-600">Edit</button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteHabit(habit.title)}
                    className="block mx-auto my-2 text-[#9fa7b3] text-ml hover:text-red-500 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

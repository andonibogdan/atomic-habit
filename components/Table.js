import React, { useState, useEffect } from "react";
import { auth } from "utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteHabit } from "utils/firestore";
import { editHabit } from "utils/firestore";
import Link from "next/link";
import { MdDone, MdMoreTime } from "react-icons/md";

export const Table = ({ habits, refreshData }) => {
  const [user, loading] = useAuthState(auth);
  const [cells, setCells] = useState([]);

  useEffect(() => {
    setCells(
      habits.map((cell, index) => ({ id: index, ...cell, editable: false }))
    );
  }, [habits]);

  const handleEdit = (id) => {
    setCells(
      cells.map((cell) => {
        if (cell.id === id) {
          return { ...cell, editable: true };
        } else {
          return { ...cell, editable: false };
        }
      })
    );
  };

  const handleSave = async (id, newValue) => {
    setCells(
      cells.map((cell) => {
        if (cell.id === id) {
          return { ...cell, title: newValue, editable: false };
        }
        return cell;
      })
    );
    const newHabit = cells.find((cell) => cell.id === id);
    editHabit(
      user.uid,
      { title: newHabit.title, hours: newHabit.hours, logs: newHabit.logs },
      newHabit.id
    )
      .then(() => {
        refreshData();
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteHabit = async (habit) => {
    const habitData = {
      title: habit.title,
      hours: habit.hours,
      logs: habit.logs || [],
    };
    deleteHabit(user.uid, habitData)
      .then(() => {
        refreshData();
      })
      .catch((error) => console.log(error));
  };

  const remainingHours = (cell) => {
    const hours = cell.hours;
    let spentHours = 0;
    if (cell.hasOwnProperty("logs")) {
      spentHours = cell.logs.reduce((acc, log) => acc + log.hours, 0);
    }
    return hours - spentHours;
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-3">
              Number
            </th>
            <th scope="col" className="px-6 py-3">
              Habit
            </th>
            <th scope="col" className="px-2 py-3">
              Remaining(h)
            </th>
            <th scope="col" className="py-3"></th>
            <th scope="col" className="py-3"></th>
            <th scope="col" className="py-3"></th>
          </tr>
        </thead>
        <tbody>
          {cells.map((cell) => {
            return (
              <tr key={cell.id} className="bg-white border-b  hover:bg-gray-50">
                <th
                  scope="row"
                  className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {cell.id + 1}
                </th>
                <td className="px-6 py-4">
                  {cell.editable ? (
                    <input
                      autoFocus
                      className="p-2"
                      type="text"
                      value={cell.title}
                      onChange={(e) =>
                        setCells(
                          cells.map((c) => {
                            if (c.id === cell.id) {
                              return { ...c, title: e.target.value };
                            }
                            return c;
                          })
                        )
                      }
                    />
                  ) : (
                    cell.title
                  )}
                </td>
                <td className="px-2 py-2">
                  {remainingHours(cell) === 0 ? (
                    <MdDone />
                  ) : remainingHours(cell) > 0 ? (
                    remainingHours(cell)
                  ) : (
                    <div className="flex items-center gap-1">
                      <MdMoreTime />
                      <span>{Math.abs(remainingHours(cell))}</span>
                    </div>
                  )}
                </td>
                <td className="py-4 text-right">
                  {cell.editable ? (
                    <button
                      className="text-[#9fa7b3]  hover:text-blue-500 font-medium mx-2"
                      onClick={() => handleSave(cell.id, cell.title)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="text-[#9fa7b3]  hover:text-blue-500 font-medium mx-2"
                      onClick={() => handleEdit(cell.id)}
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td className="py-4 text-center">
                  <button
                    onClick={() => handleDeleteHabit(cell)}
                    className="text-[#9fa7b3]  hover:text-red-500 font-medium mx-2"
                  >
                    Delete
                  </button>
                </td>
                <td className="py-4">
                  <Link
                    href={`/habit/${cell.id}`}
                    className="text-[#9fa7b3] hover:text-yellow-500 font-medium ml-2 mr-1"
                  >
                    Log
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

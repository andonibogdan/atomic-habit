import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./firebase";

// export const initDoc = async (uid) => {
//   try {
//     const dbRef = collection(db, "habits");
//     await setDoc(doc(dbRef, uid), {
//       habits: [],
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getHabits = async (uid) => {
  try {
    const dbRef = collection(db, "habits");
    const q = query(dbRef, where("__name__", "==", uid));
    const querrySnapshot = await getDocs(q);
    const data = querrySnapshot?.docs[0].data();
    return data?.habits || [];
  } catch (error) {
    console.log(error);
  }
};

export const postHabit = async (uid, habit) => {
  try {
    const ref = doc(db, "habits", uid);
    await updateDoc(ref, {
      habits: arrayUnion(habit),
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudent = async (uid, habit) => {
  try {
    const ref = doc(db, "habits", uid);
    await updateDoc(ref, {
      habits: arrayRemove(habit),
    });
  } catch (error) {
    console.log(error);
  }
};

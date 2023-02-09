import { data } from "autoprefixer";
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

export const initDoc = async (uid) => {
  try {
    const dbRef = collection(db, "habits");
    const q = query(dbRef, where("__name__", "==", uid));
    const querrySnapshot = await getDocs(q);
    const data = querrySnapshot?.docs;
    if (data.length === 0) {
      await setDoc(doc(dbRef, uid), {
        habits: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

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

export const getLogs = async (uid, habitId) => {
  try {
    const dbRef = collection(db, "habits");
    const q = query(dbRef, where("__name__", "==", uid));
    const querrySnapshot = await getDocs(q);
    const data = querrySnapshot?.docs[0].data();
    const myHabit = data.habits[habitId];
    return myHabit.logs || [];
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

export const postLogs = async (uid, log, habitId) => {
  try {
    const ref = doc(db, "habits", uid);
    const existingHabits = await getHabits(uid);
    const myHabit = existingHabits[habitId];
    const myLogs = myHabit.logs || [];
    myLogs.push(log);
    myHabit.logs = myLogs;
    await updateDoc(ref, {
      habits: existingHabits,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editHabit = async (uid, habit, id) => {
  try {
    const existingHabits = await getHabits(uid);
    existingHabits[id] = habit;
    const ref = doc(db, "habits", uid);
    await updateDoc(ref, {
      habits: existingHabits,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteHabit = async (uid, habit) => {
  try {
    const ref = doc(db, "habits", uid);
    await updateDoc(ref, {
      habits: arrayRemove(habit),
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteLog = async (uid, log, habitId) => {
  try {
    const ref = doc(db, "habits", uid);
    const existingHabits = await getHabits(uid);
    const myHabit = existingHabits[habitId];
    const myLogs = myHabit.logs || [];
    for (let i = myLogs.length - 1; i >= 0; --i) {
      if (myLogs[i].hours === log.hours && myLogs[i].text === log.text) {
        myLogs.splice(i, 1);
      }
    }
    myHabit.logs = myLogs;
    await updateDoc(ref, {
      habits: existingHabits,
    });
  } catch (error) {
    console.log(error);
  }
};

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BiAtom } from "react-icons/bi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "utils/firebase";
import { RiLogoutCircleLine } from "react-icons/ri";

export default function Nav() {
  const [user, loading] = useAuthState(auth);
  return (
    <nav className="flex justify-between items-center py-10 md:mx-24">
      <Link href={"/"} className="font-black">
        <BiAtom size={42} style={{ display: "inline-block" }} />
        Atomic Habit
      </Link>
      {!user && (
        <Link
          href={"/auth/login"}
          className="py-2 px-4 text-lg bg-black text-white rounded-lg font-medium ml-8"
        >
          Try it
        </Link>
      )}
      {user && (
        <div className="flex gap-2">
          <RiLogoutCircleLine
            size={42}
            className="cursor-pointer hover:text-gray-600"
            type="button"
            onClick={() => auth.signOut()}
          />
          <Link href={"/dashboard"}>
            <img
              src={user?.photoURL}
              alt="avatar"
              width={42}
              height={42}
              className="mx-auto rounded-full"
              referrerPolicy="no-referrer"
            />
          </Link>
        </div>
      )}
    </nav>
  );
}

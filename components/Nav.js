import Link from "next/link"
import { BiAtom } from 'react-icons/bi'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "utils/firebase"

export default function Nav() {
    const [user, loading] = useAuthState(auth);
    return (
        <nav className="flex justify-between items-center py-10 md:mx-24">
            <Link href={'/'} className='font-black'>
                Atomic Habit
                <BiAtom size={42} style={{ display: 'inline-block' }} />
            </Link>
            {!user && (
                <Link href={'/auth/login'} className="py-2 px-4 text-lg bg-teal-500 text-white rounded-lg font-medium ml-8">
                    Try it
                </Link>
            )}
            {user && (
                <div className='flex'>
                    <Link href={'/dashboard'}>
                        <img src={user?.photoURL} alt='avatar' width={42} height={42} className='mx-auto rounded-full' referrerPolicy="no-referrer"></img>
                    </Link>
                </div>
            )}
        </nav>
    )
}
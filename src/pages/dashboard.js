import { auth } from "utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router";

export default function Dashboard() {
    const [user, loading] = useAuthState(auth);
    const route = useRouter();
    if (loading) return <h1>Loading...</h1>
    if (!user) route.push('/auth/login');
    return (
        <div>
            {!loading && <h4 className="text-2xl text-center">Welcome to you dashboard <br /><span className="font-bold">{user?.displayName.toUpperCase()}</span></h4>}
            <button onClick={() => auth.signOut()} className='block mx-auto my-8 bg-teal-500 text-white p-3 font-medium rounded-lg '>Sign out</button>
        </div>
    )
}
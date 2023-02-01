import Nav from './Nav';

export default function Layout({ childeren }) {
    return (
        <div className='mx-14 h-screen'>
            <Nav />
            <main>{childeren}</main>
        </div>
    )
}
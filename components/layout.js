import Nav from './Nav';

export default function Layout({ childeren }) {
    return (
        <div className='sm:mx-14 mx-10'>
            <Nav />
            <main>{childeren}</main>
        </div>
    )
}
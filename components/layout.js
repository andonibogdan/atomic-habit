import Nav from "./Nav";

export default function Layout({ childeren }) {
  return (
    <div className="mx-14">
      <Nav />
      <main>{childeren}</main>
    </div>
  );
}

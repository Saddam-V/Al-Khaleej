import { useLoaderData } from "react-router-dom";
import ReturnRow from "./TableReturnRow";

function Table() {
  const posts1 = useLoaderData();
  console.log(posts1);
  const posts = posts1.retrns;

  return (
    <>
      <h1 className="bg-emerald-300 rounded">Catalogues</h1>
      <div className="h-7 grid w-full grid-cols-6 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <h1>Customer Name</h1>
        <h1>Customer Number</h1>
        <h1>Catalogue Number</h1>
        <h1>Color Number</h1>
        <h1>Meter</h1>
        <h1>Date</h1>
      </div>

      {posts.length > 0 &&
        posts.map((post) => (
          <ReturnRow
            key={post._id}
            custName={post.custName}
            custNum={post.custNum}
            catNum={post.catNum}
            colNum={post.colNum}
            meter={post.meter}
            date={post.startDates}
          />
        ))}
      {posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}

export default Table;

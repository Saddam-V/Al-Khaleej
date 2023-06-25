import { useLoaderData } from "react-router-dom";
import CatRow from "./CatRow";

function Table() {
  const posts1 = useLoaderData();
  const posts = posts1.cats;

  return (
    <>
      <h1 className="bg-emerald-300 rounded">Catalogues</h1>
      <div className="h-7 grid w-full grid-cols-3 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <h1>Catalogue Name</h1>
        <h1>Catalogue Number</h1>
        <h1>Created At</h1>
      </div>

      {posts.length > 0 &&
        posts.map((post) => (
          <CatRow key={post._id} catName={post.catName} catNum={post.catNum} orders={post.orders} createdAt={post.startDates} />
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

import { useLoaderData } from "react-router-dom";
import CustRow from "./TableCustRow";

function Table() {
  const posts1 = useLoaderData();
  const posts = posts1.custs;

  return (
    <>
      <h1 className="bg-emerald-300 rounded">Catalogues</h1>
      <div className="h-7 grid w-full grid-cols-2 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <h1>Customer Name</h1>
        <h1>Customer Number</h1>
      </div>

      {posts.length > 0 && posts.map((post) => <CustRow key={post._id} custName={post.custName} custNum={post.custNum} />)}
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

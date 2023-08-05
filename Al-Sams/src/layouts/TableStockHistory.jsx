import { useLoaderData } from "react-router-dom";
import TableRow from "./TableRow";

function Table() {
  const posts1 = useLoaderData();
  const posts2 = posts1.stocks;
  const posts = posts2.reverse();

  return (
    <>
      <h1 className="bg-emerald-300 rounded">Stock History</h1>

      <div className="relative overflow-x-auto rounded shadow-black shadow-md">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                SI
              </th>
              <th scope="col" className="px-6 py-3">
                Catalogue Number
              </th>
              <th scope="col" className="px-6 py-3">
                Color Number
              </th>
              <th scope="col" className="px-6 py-3">
                Meter
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Rate
              </th> */}
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 &&
              posts.map((post, index) => (
                <TableRow
                  si={index}
                  key={post._id}
                  catNum={post.catNum}
                  colNum={post.colNum}
                  meter={post.meter}
                  // rate={post.rate}
                  createdAt={post.startDates}
                />
              ))}
            {posts.length === 0 && (
              <div style={{ textAlign: "center", color: "white" }}>
                <h2>There are no posts yet.</h2>
                <p>Start adding some!</p>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;

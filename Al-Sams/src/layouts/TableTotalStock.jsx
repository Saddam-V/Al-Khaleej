import { useLoaderData } from "react-router-dom";
import TableRow from "./TableRow";

function Table() {
  const posts1 = useLoaderData();
  const posts = posts1.stocks;

  return (
    <>
      <button onClick={Print} className="bg-blue-700 pl-7 pr-7 pt-2 pb-2 text-white rounded flex mb-3">
        Print
      </button>
      <h1 className="bg-emerald-300 rounded">Total Stock</h1>
      <div id="tableContent" className="relative overflow-x-auto rounded shadow-black shadow-md">
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
              <th scope="col" className="px-6 py-3">
                Total Sold
              </th>
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
                  meter={post.meter.toFixed(2)}
                  totalSold={post.totalSold}
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
      <iframe id="ifmcontentstoprint" className="h-0 w-0 absolute"></iframe>
    </>
  );
}

export default Table;

const Print = () => {
  var content = document.getElementById("tableContent");
  var pri = document.getElementById("ifmcontentstoprint").contentWindow;
  pri.document.open();
  pri.document.write(content.innerHTML);
  pri.document.close();
  pri.focus();
  pri.print();
};

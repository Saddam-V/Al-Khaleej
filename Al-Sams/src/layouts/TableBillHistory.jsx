import { useLoaderData } from "react-router-dom";
// import TableRow from "./TableRow";
import BillRow from "./BillRow";

function Table() {
  const posts1 = useLoaderData();
  const posts = posts1.bills;

  return (
    <>
      <h1 className="bg-emerald-300 rounded">Bills History</h1>
      <div className="h-7 grid w-full grid-cols-5 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <h1>Customer Name</h1>
        <h1>Customer Number</h1>
        <h1>Price</h1>
        <h1>Price Discount</h1>
        <h1>Created At</h1>
      </div>

      {posts.length > 0 &&
        posts.map((post) => (
          <BillRow
            key={post._id}
            custName={post.custName}
            custNum={post.custNum}
            orders={post.orders}
            price={post.price}
            priceDiscount={post.priceDiscount}
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
    </>
  );
}

export default Table;

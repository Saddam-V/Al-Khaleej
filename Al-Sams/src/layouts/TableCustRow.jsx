function CustRow({ custNum, custName }) {
  return (
    <>
      <div className="grid w-full grid-cols-2 border-gray-400 border-spacing-1 border bg-backclr text-white">
        <h1>{custName}</h1>
        <h1>{custNum}</h1>
      </div>
      {/* <select
        name="option"
        id="countries"
        className="w-full grid grid-cols-1 bg-gray-50 h-11 rounded-l shadow-sm border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Expand ...</option>
        {orders.length > 0 &&
          orders.map((order) => (
            <option className="bg-black" value="catNum">
              ColNum: {order.colNum} - Rate: {order.rate}
            </option>
          ))}
      </select> */}
    </>
  );
}

export default CustRow;

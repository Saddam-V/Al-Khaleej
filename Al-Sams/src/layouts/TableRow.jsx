function TableRow({ colNum, catNum, meter, createdAt, custName, custNum, price, priceDiscount, totalSold }) {
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        {/* <td>{id}</td> */}
        {custName && (
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {custName}
          </th>
        )}
        {custNum && (
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {custNum}
          </th>
        )}
        {catNum && (
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {catNum}
          </th>
        )}
        {colNum && <td className="px-6 py-4">{colNum}</td>}
        {meter && <td className="px-6 py-4">{meter}</td>}
        {totalSold && <td className="px-6 py-4">{totalSold}</td>}
        {priceDiscount && <td className="px-6 py-4">{priceDiscount}</td>}
        {/* <td className="px-6 py-4">{rate}</td> */}
        {createdAt && <td className="px-6 py-4">{createdAt}</td>}
      </tr>
    </>
  );
}

export default TableRow;

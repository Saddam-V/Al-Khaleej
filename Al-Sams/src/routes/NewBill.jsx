import { Link, Form, redirect } from "react-router-dom";
import classes from "./NewStock.module.css";
import Modal from "../components/Modal";
import { Outlet } from "react-router-dom";
import Sams from "../assets/Khaleej.png";

function NewBill() {
  return (
    <Modal>
      <div className="grid xl:grid-cols-2 gap-1">
        <div>
          <h2>Create Bill</h2>
          <Form id="create-course-form" method="post" className={classes.form}>
            <p className="flex flex-row justify-around mt-5 mb-5">
              <label htmlFor="body" className="w-1/2">
                Customer Name
              </label>
              <input type="text" id="custName" name="custName" required />
            </p>
            <p className="flex flex-row justify-around mt-5 mb-5">
              <label htmlFor="name" className="w-1/2">
                Customer Number
              </label>
              <input type="text" id="custNum" name="custNum" required />
            </p>
            <p className="flex flex-row justify-around mt-5 mb-5">
              <label htmlFor="name" className="w-1/2">
                Catalogue Number
              </label>
              <input type="text" id="catNum" name="catNum" required />
            </p>
            <p className="flex flex-row justify-around mt-5 mb-5">
              <label htmlFor="name" className="w-1/2">
                Color Number
              </label>
              <input type="text" id="colNum" name="colNum" required />
            </p>
            <p className="flex flex-row justify-around mt-5 mb-5">
              <label htmlFor="name" className="w-1/2">
                Meter
              </label>
              <input type="text" id="meter" name="meter" required />
            </p>
            <p className="flex flex-row justify-around mt-5 mb-5">
              <label htmlFor="name" className="w-1/2">
                Discount
              </label>
              <input type="text" id="priceDiscount" name="priceDiscount" required />
            </p>
            <p className="flex justify-end">
              <button className="mr-10 bg-backclr w-32 text-button">Add Item</button>
              <p className="bg-button rounded p-3 mr-10 w-32" onClick={finalSubmit}>
                Print Bill
              </p>
              <Link className="bg-backclr text-button rounded p-3 mr-10 w-32" to="../billHistory/-createdAt" type="button">
                Back
              </Link>
            </p>
          </Form>
        </div>
        <Outlet />
        <div className="bg-emerald-600 bg-opacity-20 ml-44 mr-44">
          <div className="flex justify-center flex-row">
            <div id="ticket" className="ticket flex justify-center flex-col items-center">
              {/* <img className="w-20 h-20 rounded-full" src={Sams} alt="image description"></img> */}
              <table id="custDetails">
                <tr className="grid grid-cols-2 gap-2">
                  <td id="custnm">Customer Name : </td>
                </tr>
                <tr className="grid grid-cols-2 gap-2">
                  <td id="custnum">Customer Number : </td>
                </tr>
              </table>
              <table>
                <thead>
                  <tr className="grid grid-cols-5 mt-5">
                    <th className="">C.Num</th>
                    <th className="">Col.Num</th>
                    <th className="">Meter</th>
                    <th className="">Rate</th>
                    <th className="">Price</th>
                  </tr>
                </thead>
                <tbody id="billBody"></tbody>
              </table>
              <table id="custDetails2">
                <tr className="grid grid-cols-2 gap-2">
                  <td id="discount">Discount : </td>
                </tr>
                <tr className="grid grid-cols-2 gap-2">
                  <td id="totalPrice">Total : </td>
                </tr>
              </table>
              <p className="centered">Thanks for your purchase!</p>
            </div>
          </div>
          <iframe id="ifmcontentstoprint" className="h-0 w-0 absolute"></iframe>
        </div>
      </div>
    </Modal>
  );
}

export default NewBill;
//-----------------------To Print Page--------------------------------------
const Print = () => {
  var content = document.getElementById("ticket");
  var pri = document.getElementById("ifmcontentstoprint").contentWindow;
  pri.document.open();
  pri.document.write(content.innerHTML);
  pri.document.close();
  pri.focus();
  pri.print();
};

//-------------------------To Calculate Price------------------------------------
const calculatePrice = (data) => {
  let prc = 0;
  for (let index = 0; index < data.length; index++) {
    data[index] = JSON.parse(data[index]);
    prc = prc + parseFloat(data[index].meter) * parseFloat(data[index].rate);
  }
  prc = prc - data[data.length - 1].priceDiscount;
  prc = prc.toFixed(2);
  return prc;
};

// -------------------------To Add Item------------------------------------
// const findRate = (data) => {

// }
// -------------------------To Add Item------------------------------------
var dataToSend = { orders: [] };
export async function action({ request }) {
  const formData = await request.formData(); // data from form
  const postData = Object.fromEntries(formData); // { CatNam: '...', CatNum: '...' }

  await fetch("http://localhost:4000/api/v1/bill/validate", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then(async (response) => {
    if (!response.ok) alert("Maybe stock is insufficient");
    else {
      //
      const rateResponse = await fetch("http://localhost:4000/api/v1/bill/findRate", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const resData = await rateResponse.json();
      postData.rate = resData;
      console.log(postData);
      const newData = JSON.stringify(postData); // stringify the data
      dataToSend.orders.push(newData); // add data to array
      //
      const row = document.createElement("tr");
      row.className = "grid grid-cols-5 mt-5";
      const col1 = document.createElement("td");
      const col2 = document.createElement("td");
      const col3 = document.createElement("td");
      const col4 = document.createElement("td");
      const col5 = document.createElement("td");
      const textnode1 = document.createTextNode(postData.catNum);
      const textnode2 = document.createTextNode(postData.colNum);
      const textnode3 = document.createTextNode(postData.meter);
      const textnode4 = document.createTextNode(postData.rate);
      const textnode5 = document.createTextNode(
        parseFloat(postData.meter * postData.rate)
          .toFixed(2)
          .toString()
      );
      col1.appendChild(textnode1);
      col2.appendChild(textnode2);
      col3.appendChild(textnode3);
      col4.appendChild(textnode4);
      col5.appendChild(textnode5);
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      row.appendChild(col5);
      document.getElementById("billBody").appendChild(row);
      //
    }
  });

  // document.getElementById("create-course-form").reset(); // reset the form
  document.getElementById("catNum").value = "";
  document.getElementById("colNum").value = "";
  document.getElementById("meter").value = "";

  document.getElementById("catNum").focus(); // focus on first input
  return null;
}

//-------------------------Final Submit------------------------------------
const finalSubmit = async () => {
  await fetch("http://localhost:4000/api/v1/bill", {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then((response) => {
    if (!response.ok) alert("Maybe stock is insufficient");
    else {
      const nm = document.createElement("td");
      const num = document.createElement("td");
      const firstObj = JSON.parse(dataToSend.orders[0]);
      const custnm = document.createTextNode(firstObj.custName);
      const custnum = document.createTextNode(firstObj.custNum);
      nm.appendChild(custnm);
      num.appendChild(custnum);
      document.getElementById("custnm").appendChild(custnm);
      document.getElementById("custnum").appendChild(custnum);

      const prc1 = calculatePrice(dataToSend.orders);
      var prc = prc1.toString();
      const tprc = document.createElement("td");
      const custprc = document.createTextNode(prc);
      tprc.appendChild(custprc);
      document.getElementById("totalPrice").appendChild(tprc);

      const ds = document.createElement("td");
      const dsc = document.createTextNode(firstObj.priceDiscount);
      ds.appendChild(dsc);
      document.getElementById("discount").appendChild(ds);

      Print();
      Print();
      tprc.remove();
      ds.remove();
      document.getElementById("custnm").innerHTML = "Customer Name: ";
      document.getElementById("custnum").innerHTML = "Customer Number:  ";
    }
    dataToSend.orders = [];
    document.getElementById("billBody").innerHTML = "";
    // document.getElementById("custDetails").innerHTML = "";
    // document.getElementById("custDetails2").innerHTML = "";
    document.getElementById("create-course-form").reset();
  });
};

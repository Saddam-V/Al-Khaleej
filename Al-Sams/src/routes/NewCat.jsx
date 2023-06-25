import { Link, Form, redirect } from "react-router-dom";
import classes from "./NewStock.module.css";
import Modal from "../components/Modal";
import { Outlet } from "react-router-dom";
import Sams from "../assets/Khaleej.png";

function NewCat() {
  return (
    <Modal>
      <div className="grid xl:grid-cols-2 gap-1">
        <div>
          <h2>Create Catalogue</h2>
          <Form id="create-course-form" method="post" className={classes.form}>
            <p className="flex flex-row justify-around mt-5 mb-5">
              <label htmlFor="body" className="w-1/2">
                Catalogue Name
              </label>
              <input type="text" id="catName" name="catName" required />
            </p>

            <p className="flex flex-row justify-around mt-5 mb-5">
              <label htmlFor="name" className="w-1/2">
                Cataloue Number
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
                Rate
              </label>
              <input type="text" id="rate" name="rate" required />
            </p>

            <p className="flex justify-end">
              <button className="mr-10 bg-backclr w-32 text-button">Add Color</button>
              <p className="bg-button rounded p-3 mr-10 w-44" onClick={finalSubmit}>
                Add Catalogue
              </p>
              <Link className="bg-backclr text-button rounded p-3 mr-10 w-32" to="../catalogue/-createdAt" type="button">
                Back
              </Link>
            </p>
          </Form>
        </div>
        <Outlet />
        <div className="bg-emerald-600 bg-opacity-20 ml-32 mr-32">
          <div className="flex justify-center flex-row">
            <div id="ticket" className="ticket flex justify-center flex-col items-center">
              {/* <img className="w-20 h-20 rounded-full" src={Sams} alt="image description"></img> */}
              <table id="custDetails">
                <tr className="grid grid-cols-2 gap-2 w-full">
                  <td id="custnm">Catalogue Name : </td>
                </tr>
                <tr className="grid grid-cols-2 gap-2">
                  <td id="custnum">Catalogue Number : </td>
                </tr>
              </table>
              <table>
                <thead>
                  <tr className="grid grid-cols-2 mt-2">
                    <th className="">C.Num</th>
                    <th className="">Rate</th>
                  </tr>
                </thead>
                <tbody id="billBody"></tbody>
              </table>
              {/* <table id="custDetails2">
                <tr className="grid grid-cols-2 gap-2">
                  <td id="discount">Discount : </td>
                </tr>
                <tr className="grid grid-cols-2 gap-2">
                  <td id="totalPrice">Total : </td>
                </tr>
              </table> */}
              {/* <p className="centered">Thanks for your purchase! parzibyte.me/blog</p> */}
            </div>
          </div>
          <iframe id="ifmcontentstoprint" className="h-0 w-0 absolute"></iframe>
        </div>
      </div>
    </Modal>
  );
}

export default NewCat;

//-------------------------color validation------------------------------------

function doesValueExist(objectsArray, property, value) {
  for (let i = 0; i < objectsArray.length; i++) {
    const parsedObject = JSON.parse(objectsArray[i]);
    if (parsedObject.hasOwnProperty(property) && parsedObject[property] === value) {
      return true;
    }
  }
  return false;
}

//-------------------------To Add Item------------------------------------
var dataToSend = { orders: [] };
export async function action({ request }) {
  const formData = await request.formData(); // data from form
  const postData = Object.fromEntries(formData); // { CatNam: '...', CatNum: '...' }

  const newData = JSON.stringify(postData); // stringify the data

  const val = postData.colNum.toString();
  if (doesValueExist(dataToSend.orders, "colNum", val)) {
    alert("Color already exists");
  } else {
    dataToSend.orders.push(newData); // add data to array

    const row = document.createElement("tr");
    row.className = "grid grid-cols-2 mt-2";
    const col2 = document.createElement("td");
    const col4 = document.createElement("td");
    const textnode2 = document.createTextNode(postData.colNum);
    const textnode4 = document.createTextNode(postData.rate);
    col2.appendChild(textnode2);
    col4.appendChild(textnode4);
    row.appendChild(col2);
    row.appendChild(col4);
    document.getElementById("billBody").appendChild(row);
  }
  // });

  // document.getElementById("create-course-form").reset(); // reset the form
  document.getElementById("colNum").value = "";
  document.getElementById("rate").value = "";

  document.getElementById("colNum").focus(); // focus on first input
  return null;
}

//-------------------------Final Submit------------------------------------
const finalSubmit = async () => {
  await fetch("http://localhost:4000/api/v1/cat", {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then((response) => {
    if (!response.ok) alert("Check if Catalogue already Exists");
    else {
      alert("Success");
    }
    dataToSend.orders = [];
    document.getElementById("billBody").innerHTML = "";
    document.getElementById("custDetails").innerHTML = "";
    document.getElementById("create-course-form").reset();
  });
};

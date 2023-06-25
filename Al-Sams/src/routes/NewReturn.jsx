import { Link, Form, redirect } from "react-router-dom";

import classes from "./NewStock.module.css";
import Modal from "../components/Modal";

function NewReturn() {
  return (
    <Modal>
      <Form id="create-course-form" method="post" className={classes.form}>
        <p>
          <label htmlFor="name">Customer Name</label>
          <input type="text" id="custNameID" name="custName" required />
        </p>
        <p>
          <label htmlFor="name">Customer Number</label>
          <input type="text" id="custNumID" name="custNum" />
        </p>
        <p>
          <label htmlFor="name">Catalogue Number</label>
          <input type="text" id="catNumID" name="catNum" required />
        </p>
        <p>
          <label htmlFor="name">Color Number</label>
          <input type="text" id="colNumID" name="colNum" required />
        </p>
        <p>
          <label htmlFor="name">Meter</label>
          <input type="text" id="meterID" name="meter" required />
        </p>
        <p className="flex justify-end mt-5">
          <Link className="bg-backclr text-button rounded p-3 mr-10 w-32" to="/return/-createdAt" type="button">
            Back
          </Link>
          <button className="bg-button rounded p-3 mr-10 w-32">Submit</button>
        </p>
      </Form>

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
            <tr className="grid grid-cols-2 gap-2">
              <td id="catNum">Catalogue Number : </td>
            </tr>
            <tr className="grid grid-cols-2 gap-2">
              <td id="colNum">Color Number : </td>
            </tr>
            <tr className="grid grid-cols-2 gap-2">
              <td id="meter">Meter : </td>
            </tr>
          </table>
          <p className="centered">Return Success.</p>
        </div>
      </div>
      <iframe id="ifmcontentstoprint" className="h-0 w-0 absolute"></iframe>
    </Modal>
  );
}

export default NewReturn;

const Print = () => {
  console.log("inPrint");
  var content = document.getElementById("ticket");
  var pri = document.getElementById("ifmcontentstoprint").contentWindow;
  pri.document.open();
  pri.document.write(content.innerHTML);
  pri.document.close();
  pri.focus();
  pri.print();
  console.log("printEnd");
};

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData); // { body: '...', author: '...' }
  await fetch("http://localhost:3000/api/v1/return", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then((response) => {
    if (!response.ok) alert("Some Error has occurred");
    else {
      console.log("all good");
      const custNameElement = document.createElement("td");
      const custNameTextNode = document.createTextNode(postData.custName);
      custNameElement.appendChild(custNameTextNode);
      document.getElementById("custnm").appendChild(custNameElement);

      const custNumElement = document.createElement("td");
      const custNumTextNode = document.createTextNode(postData.custNum);
      custNumElement.appendChild(custNumTextNode);
      document.getElementById("custnum").appendChild(custNumElement);

      const catNumElement = document.createElement("td");
      const catNumTextNode = document.createTextNode(postData.catNum);
      catNumElement.appendChild(catNumTextNode);
      document.getElementById("catNum").appendChild(catNumElement);

      const colNumElement = document.createElement("td");
      const colNumTextNode = document.createTextNode(postData.colNum);
      colNumElement.appendChild(colNumTextNode);
      document.getElementById("colNum").appendChild(colNumElement);

      const meterElement = document.createElement("td");
      const meterTextNode = document.createTextNode(postData.meter);
      meterElement.appendChild(meterTextNode);
      document.getElementById("meter").appendChild(meterElement);

      Print();
      Print();

      document.getElementById("create-course-form").reset();
      document.getElementById("custnm").innerHTML = "Customer Name: ";
      document.getElementById("custnum").innerHTML = "Customer Number:  ";
      document.getElementById("catNum").innerHTML = "Catalogue Number:  ";
      document.getElementById("colNum").innerHTML = "Colour Number:  ";
      document.getElementById("meter").innerHTML = "Meter :  ";
    }
  });
  return null;
}

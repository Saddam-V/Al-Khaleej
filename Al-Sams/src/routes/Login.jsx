import { Link, Form, redirect } from "react-router-dom";

import classes from "./NewStock.module.css";
import Modal from "../components/Modal";

function Login() {
  return (
    <Modal>
      <Form method="post" className={classes.form}>
        <p className="grid grid-cols-2 mb-5">
          <label htmlFor="name">Email</label>
          <input type="email" id="name" name="email" required />
        </p>
        <p className="grid grid-cols-2 mt-5">
          <label htmlFor="name">Password</label>
          <input type="password" id="name" name="password" required />
        </p>
        <p className="flex justify-end mt-5">
          <Link className="bg-backclr text-button rounded p-3 mr-10 w-32" to=".." type="button">
            Back
          </Link>
          <button className="bg-button rounded p-3 mr-10 w-44">Sign In</button>
        </p>
      </Form>
    </Modal>
  );
}

export default Login;

export async function action({ request }) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData); // { body: '...', author: '...' }
  const response = await fetch("http://localhost:3000/api/v1/users/login", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (!res.ok) alert("Maybe stock is insufficient");
    else {
      var body = await res.json();
      console.log(body);
      localStorage.setItem("token", body.token);
      localStorage.setItem("log", "true");
      // const test = localStorage.getItem("token");
      // console.log(test);
    }
  });
  //   console.log(response);
  //   console.log(response.data);
  //   console.log(response.data.token);
  return redirect("/logged-check");
}

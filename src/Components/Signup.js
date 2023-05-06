import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    cpassword: "",
    address: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phoneNo, password, address } = credentials;
    const response = await fetch("http://localhost:8000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phoneNo,
        address,
        password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    } else {
      alert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col h-[98vh] w-[100vw] justify-center items-center bg-[#DF6589FF] text-white">
      <div className="bg-[#3C1053FF] p-[2.5vw] rounded-2xl w-[20vw]">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={onChange}
              aria-describedby="emailHelp"
              className="bg-[#3C1053FF] border-b-2 border-white"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={onChange}
              aria-describedby="emailHelp"
              className="bg-[#3C1053FF] border-b-2 border-white"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phoneNo">Phone Number</label>
            <input
              type="number"
              id="phoneNo"
              name="phoneNo"
              onChange={onChange}
              aria-describedby="emailHelp"
              className="bg-[#3C1053FF] border-b-2 border-white"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={onChange}
              aria-describedby="emailHelp"
              className="bg-[#3C1053FF] border-b-2 border-white"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={onChange}
              minLength={5}
              required
              id="password"
              className="bg-[#3C1053FF] border-b-2 border-white"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="cpassword">Comfirm Password</label>
            <input
              type="password"
              name="cpassword"
              onChange={onChange}
              minLength={5}
              required
              id="cpassword"
              className="bg-[#3C1053FF] border-b-2 border-white"
            />
          </div>
          <div className="text-center mt-[5vh]">
            <button className=" text-white font-bold" type="submit">
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    phoneNo: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        phoneNo: credentials.phoneNo,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    } else {
      alert("Invalid Detials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const [emailOrPhoneNo, setEmailOrPhoneNo] = useState(0);

  return (
    <div className="flex flex-col h-[98vh] w-[100vw] justify-center items-center bg-[#DF6589FF] text-white">
      <div className="bg-[#3C1053FF] p-[2.5vw] rounded-2xl">
        <div>
          <div className="flex text-gray-400">
            <p onClick={() => setEmailOrPhoneNo(0)}>Email id</p>
            <p>/</p>
            <p onClick={() => setEmailOrPhoneNo(1)}>Phone no</p>
          </div>
          <form onSubmit={handleSubmit}>
            {emailOrPhoneNo === 0 ? (
              <div className="flex flex-col mb-[5vh]">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={onChange}
                  value={credentials.email}
                  aria-describedby="emailHelp"
                  className="bg-[#3C1053FF] text-white border-b-2 border-white"
                />
              </div>
            ) : (
              <div className="flex flex-col mb-[5vh]">
                <label htmlFor="phoneNo">Phone Number</label>
                <input
                  type="number"
                  id="phoneNo"
                  name="phoneNo"
                  onChange={onChange}
                  value={credentials.phoneNo}
                  aria-describedby="emailHelp"
                  className="bg-[#3C1053FF] text-white border-b-2 border-white"
                />
              </div>
            )}
            <div>
              <label htmlFor="password" className="form-label flex flex-col">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={onChange}
                id="password"
                name="password"
                className="bg-[#3C1053FF] text-white border-b-2 border-white"
              />
            </div>
            <div className="text-center mt-[5vh]">
              <button className="font-bold" type="submit">
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

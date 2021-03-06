import { useState } from "react";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import axios from "axios";
import config from "../config/config";
import Router from "next/router";

export default function Register({ token }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const profileUser = async () => {
    console.log("token: ", token);
    const users = await axios.get(`${config.URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("user: ", users.data);
  };

  const register = async (req, res) => {
    try {
      let result = await axios.post(`${config.URL}/register`, {
        username,
        email,
        password,
      });
      console.log("result: ", result);
      console.log("result.data:  ", result.data);
      console.log("token:  ", token);
      setStatus(result.data.message);
    } catch (e) {
      console.log(e);
    }
  };

  const registerForm = () => (
    <div class="flex justify-center ... mt-10">
      <div class="H-20 w-30 rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="px-6 pt-4 pb-2">
            <div class="w-42 H-20 ">
              <p class="text-gray-700 text-base font-bold text-center mb-2">
                Create Account
              </p>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              ></input>

              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>

              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Password"
                type="Password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <br></br>
              <br></br>
              <p class=" text-gray-700  mb-">Status: {status}</p>
            </div>

            <br></br>
            <br></br>
            <div class="flex items-center justify-between">

              <button
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-3"
                type="button"
                onClick={() => loginpage()}
              >
                LOGIN
              </button>
              <button
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-3"
                type="button"
                onClick={register}
              >
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );


  const loginpage = () =>
    Router.push({
      pathname: "/login",
    });

  return (
    <Layout>
      <Navbar />
      <form class="px-6 pt-4 pb-2 ">
        <div class="mb-4">{registerForm()}</div>
        <div class="mb-6">
        </div>
      </form>
    </Layout>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
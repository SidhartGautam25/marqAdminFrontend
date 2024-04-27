"use client";

import { useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext, AuthContextType } from "../context/authContext";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [user, setUser] = useState<User | null>(null);
  const conobj = useContext(AuthContext) as AuthContextType;
  const { dispatch, state } = conobj;
  const [allgood, setAllgood] = useState(true);
  const router = useRouter();

  console.log("obj is on login page  ", state);

  const login = async (email: string, password: string) => {
    // Here you would call your backend service to authenticate the user
    // For this example, let's mock a successful login response
    const data = { email: email, password: password };
    //console.log("user: ", user);
    dispatch({ type: "LOGIN_START" });
    try {
    } catch (e) {
      console.log("some error occured on login page");
      setAllgood(false);
    }
    const res = await axios.post("http://localhost:8800/api/auth/login", data);
    console.log("res form login is ", res.data.details);

    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
    router.push("/");
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

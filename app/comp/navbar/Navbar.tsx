"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "@/app/context/authContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { state, dispatch } = useContext(AuthContext) as AuthContextType;
  console.log("state us in navbar ", state);
  const user = state.user;
  const router = useRouter();
  function handlelogout() {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    router.push("/login");
  }
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/">
            <span className="hover:text-gray-300">Marqstats</span>
          </Link>
        </div>
        <div className="space-x-4">
          {user ? (
            <button onClick={handlelogout} className="hover:text-gray-300">
              Logout
            </button>
          ) : (
            <Link href="/login">
              <span className="hover:text-gray-300">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "@/app/context/authContext";
import { useRouter } from "next/navigation";

const NoSSR: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
};

export default function Navbar() {
  const { state, dispatch } = useContext(AuthContext) as AuthContextType;
  // // console.log("state us in navbar ", state);
  const user = state.user;

  function handlelogout() {
    // typeof window !== "undefined" ? localStorage.removeItem("user") : null;
    dispatch({ type: "LOGOUT" });
  }
  return (
    <NoSSR>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-bold">
            <Link href="/">
              <span className="hover:text-gray-300">Marqstats</span>
            </Link>
          </div>
          <div className="space-x-4">
            <Link href="/editor">
              <span className="hover:text-gray-300 mr-6">Add</span>
            </Link>
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
    </NoSSR>
  );
}

"use client";
import Hero from "./comp/hero/Hero";
import Navbar from "./comp/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "@/app/context/authContext";
import { useRouter } from "next/navigation";
import { AuthContextType } from "@/app/context/authContext";

// import Pdfren from "./comp/pdfren/Pdfren";
// import Upsec from "./comp/upsec/Upsec";

export default function Home() {
  //image kit id-> p1howdxjk
  //ex: https://ik.imagekit.io/p1howdxjk/path/to/myimage.jpg
  const authContext = useContext<AuthContextType | null>(AuthContext);

  //const { state } = authContext;
  //console.log("state us in navbar ", state);
  const user = authContext?.state.user;
  const router = useRouter();
  // if (!user) {
  //   router.push("/login");
  // }
  return (
    <div>
      <Navbar />
      <Hero />
      {/* <Upsec />
      <Pdfren /> */}
    </div>
  );
}

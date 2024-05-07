"use client";
import Hero from "./comp/hero/Hero";
import Navbar from "./comp/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "@/app/context/authContext";
import { useRouter } from "next/navigation";

// import Pdfren from "./comp/pdfren/Pdfren";
// import Upsec from "./comp/upsec/Upsec";

export default function Home() {
  //image kit id-> p1howdxjk
  //ex: https://ik.imagekit.io/p1howdxjk/path/to/myimage.jpg
  const { state } = useContext(AuthContext);
  //console.log("state us in navbar ", state);
  const user = state.user;
  const router = useRouter();
  if (!user) {
    router.push("/login");
  }
  return (
    <div className="">
      <Navbar />
      <Hero />
      {/* <Upsec />
      <Pdfren /> */}
    </div>
  );
}

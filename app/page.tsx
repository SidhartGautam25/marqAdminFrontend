"use client";
import Hero from "./comp/hero/Hero";
import Navbar from "./comp/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "@/app/context/authContext";
import { useRouter } from "next/navigation";
import { AuthContextType } from "@/app/context/authContext";
// import AdobePdfViewer from "./comp/adobe/adoberen";

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
      {/* <AdobePdfViewer
        pdfUrl={
          "https://res.cloudinary.com/dkzpbucfz/image/upload/v1713940823/pics/lu1fo2x4kk4v9qmd5r6s.pdf"
        }
        clientId={"e2d328c60a204704a4ef0fc26e2f9fb8"}
      /> */}
      {/* <Upsec />
      <Pdfren /> */}
    </div>
  );
}

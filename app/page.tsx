"use client";
import Navbar from "./comp/navbar/Navbar";
import Hero from "./comp/hero/Hero";

// import Pdfren from "./comp/pdfren/Pdfren";
// import Upsec from "./comp/upsec/Upsec";

export default function Home() {
  //image kit id-> p1howdxjk
  //ex: https://ik.imagekit.io/p1howdxjk/path/to/myimage.jpg
  return (
    <div className="">
      <Navbar />
      <Hero />
      {/* <Upsec />
      <Pdfren /> */}
    </div>
  );
}

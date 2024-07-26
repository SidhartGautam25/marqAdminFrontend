"use client";

import Navbar from "../comp/navbar/Navbar";
// import Upload from "../comp/upload/Upload";
// import Upsec from "../comp/upsec/Upsec";
import Editortop from "../comp/editortop/Editortop";
import Editorbottom from "../comp/editorbottom/Editorbottom";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="m-1 rounded-lg flex flex-col items-center bg-slate-100">
        <Editortop />
      </div>
      <Editorbottom />
    </>
  );
}

"use client";

import Editortop from "@/app/comp/editortop/Editortop";
import Navbar from "@/app/comp/navbar/Navbar";
import Editorbottom from "@/app/comp/editorbottom/Editorbottom";
import EditEditortop from "@/app/comp/editortop/editEditortop";
import EditEditorbottom from "@/app/comp/editorbottom/EditEditorbottom";

export default function Page({ params }: { params: { slug: Number } }) {
  return (
    <>
      <Navbar />
      <div className="m-1 rounded-lg flex flex-col items-center bg-slate-100">
        <EditEditortop />
      </div>
      <EditEditorbottom />
    </>
  );
}

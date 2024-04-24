export default function RightHero() {
  return (
    <>
      <div className=" flex-[3]">
        <div className="border-2 border-black flex rounded-lg">
          <button className="flex-1 bg-gray-700 text-white rounded-lg m-2 p-2 font-bold">
            Upload New Blogs
          </button>
          <button className="flex-1  bg-gray-700 text-white rounded-lg m-2 p-2 font-bold">
            Upload New Report
          </button>
        </div>
        <div className="border-2 border-black min-h-[40rem] rounded-lg mt-2"></div>
      </div>
    </>
  );
}

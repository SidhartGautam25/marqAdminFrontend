import { Worker } from "@react-pdf-viewer/core";

// Import the main component
import { Viewer } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { bookmarkPlugin } from "@react-pdf-viewer/bookmark";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/toolbar/lib/styles/index.css";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useState } from "react";

export default function Pdfren() {
  const bookmarkPluginInstance = bookmarkPlugin();
  const { Bookmarks } = bookmarkPluginInstance;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [currentpage, setCurrentpage] = useState(0);

  const handleGoToSection = () => {
    // Calculate the position of the specific section on the page
    // For example, if you want to scroll to 50% of the page, you can set it like this
    const position = (currentpage + 1) * window.innerHeight * 0.5; // 50% of the page height

    // Scroll to the calculated position
    window.scrollTo(0, position);
  };
  return (
    <div>
      {/* <Bookmarks /> */}
      <div
        style={{
          border: "3px solid blue",
          height: "750px",
          width: "600px",
          overflow: "hidden",
        }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer
            // plugins={[defaultLayoutPluginInstance]}
            fileUrl="https://res.cloudinary.com/dkzpbucfz/image/upload/v1713940823/pics/lu1fo2x4kk4v9qmd5r6s.pdf"
            initialPage={currentpage}
            onPageChange={({ currentPage }) => setCurrentpage(currentPage)}
          />
        </Worker>
      </div>
      <button onClick={handleGoToSection}>Go to Section</button>
      <div className="border border-red-600 h-52 w-36"></div>
      <div>currentpage:{currentpage}</div>
    </div>
  );
}

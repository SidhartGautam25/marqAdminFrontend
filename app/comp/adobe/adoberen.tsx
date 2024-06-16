import React, { useEffect } from "react";

const AdobePdfViewer = ({ pdfUrl, clientId }) => {
  useEffect(() => {
    // Dynamically load the Adobe View SDK script
    const script = document.createElement("script");
    script.src = "https://acrobatservices.adobe.com/view-sdk/viewer.js";
    script.onload = () => {
      document.addEventListener("adobe_dc_view_sdk.ready", function () {
        const adobeDCView = new AdobeDC.View({
          clientId: clientId,
          divId: "adobe-dc-view",
        });
        adobeDCView.previewFile(
          {
            content: { location: { url: pdfUrl } },
            metaData: { fileName: "Sample PDF" },
          },
          { embedMode: "IN_LINE", showDownloadPDF: false, showPrintPDF: false }
        );
      });
    };
    document.body.appendChild(script);

    // Cleanup function to remove the script
    return () => {
      document.body.removeChild(script);
    };
  }, [pdfUrl, clientId]);

  return (
    <div id="adobe-dc-view" style={{ width: "100%", height: "100vh" }}></div>
  );
};

export default AdobePdfViewer;

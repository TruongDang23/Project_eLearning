import React from "react";
import styled from "styled-components";

const PdfViewer = ({ pdfUrl }) => {
  return (
    <PdfViewerWrapper>
      {/* <DocViewer documents={docs} pluginRenderers={[PDFRenderer]} /> */}
      <iframe src={pdfUrl} width="100%" height="100%" title="pdf"></iframe>
    </PdfViewerWrapper>
  );
};

const PdfViewerWrapper = styled.div`
  height: 52rem;
  margin: 0 auto;
  border-top: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  iframe {
    width: 100%;
    height: 100%;
  }
`;

export default PdfViewer;

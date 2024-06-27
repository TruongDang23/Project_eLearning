import React from "react";
import DocViewer, { PDFRenderer } from "react-doc-viewer";
import styled from "styled-components";

const PdfViewer = ({ pdfUrl }) => {
  const docs = [
    {
      uri: "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/e-learning-bucket/C000/CT01/01-intro.pdf",
    },
  ];
  return (
    <PdfViewerWrapper>
      <h1>Document Viewer</h1>
      <DocViewer documents={docs} pluginRenderers={[PDFRenderer]} />
    </PdfViewerWrapper>
  );
};

const PdfViewerWrapper = styled.div`
  width: 80%;
  height: 600px;
  margin: 0 auto;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default PdfViewer;

import React, {useState} from "react";
import {Document, Page, pdfjs} from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export const PdfViewPage: React.FC = () => {

    const [numPages, setNumPages] = useState<number>(1  );
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess() {
        console.log("pdf loaded successfully");
    }

    const onError = () => {
        console.log("ce plm")
    }

    return <div>
        <Document file="Anexa5.pdf" onLoadError={onError} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber}/>
        </Document>
        <p>
            Page {pageNumber} of {numPages}
        </p>
    </div>
}
"use client";

import { useState, useRef, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Import worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function Home() {
  const [numPages, setNumPages] = useState(0);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null); // Specify the type as HTMLDivElement

  useEffect(() => {
    function handleResize() {
    // Check if numPages is already set
    if (numPages === 0 && containerRef.current) {
        onDocumentLoadSuccess({ numPages: 0 });
      } else {
        // Reset currentPageNumber to prevent potential display issues
        setCurrentPageNumber(currentPageNumber);
      }
    }

    window.addEventListener("resize", handleResize);

   /* return () => {
      window.removeEventListener("resize", handleResize); //causing back
    };*/
  }, [numPages,currentPageNumber]); // Empty dependency array to run effect only once on component mount

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function calculatePageWidth() {
    if (containerRef.current) {
      return containerRef.current.offsetWidth;
    }
    return undefined;
  }

  return (
    <main
      ref={containerRef}
      className='flex flex-col justify-center items-center gap-3 py-5 px-24'
    >
      <Document file='/multiple.pdf' onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={currentPageNumber}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          width={calculatePageWidth()}
        />
      </Document>

      <section className='flex justify-center items-center gap-3 mb-10'>
        {currentPageNumber !== 1 ? (
          <button
            className='border border-slate-200 py-1.5 px-2 rounded'
            onClick={() => {
              setCurrentPageNumber(currentPageNumber - 1);
            }}
          >
            Prev
          </button>
        ) : null}
        <p className='text-lg font-medium'>
          Page {currentPageNumber} of {numPages}
        </p>
        {numPages && numPages > currentPageNumber ? (
          <button
            className='border border-slate-200 py-1.5 px-2 rounded'
            onClick={() => {
              setCurrentPageNumber(currentPageNumber + 1);
            }}
          >
            Next
          </button>
        ) : null}
      </section>
    </main>
  );
}

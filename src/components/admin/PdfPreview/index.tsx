import { Loader, Modal } from '@mantine/core'
import { IconCaretLeft, IconCaretRight, IconDownload } from '@tabler/icons'
import { Dispatch, SetStateAction, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface PdfPreviewProps {
  cvLink: string
  pdfDocument: string
  loadingPdf: boolean
  setSelectedCvLink: Dispatch<SetStateAction<string>>
}

export const PdfPreview = ({
  cvLink,
  pdfDocument,
  loadingPdf,
  setSelectedCvLink,
}: PdfPreviewProps) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function handleNextPage() {
    setPageNumber(Math.min(numPages || pageNumber, pageNumber + 1))
  }

  function handlePreviousPage() {
    setPageNumber(Math.max(1, pageNumber - 1))
  }

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    console.log(`Loaded ${numPages} pages`)
    setNumPages(numPages)
  }

  return (
    <Modal
      opened={!!cvLink}
      onClose={() => setSelectedCvLink('')}
      key={cvLink}
      size={'auto'}
    >
      {loadingPdf ? (
        <Loader />
      ) : (
        <>
          {numPages && numPages > 1 && (
            <div className="align-center flex justify-center">
              <button
                className="mr-3 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => handlePreviousPage()}
              >
                <IconCaretLeft />
              </button>
              <span className="flex items-center text-center">
                Page {pageNumber} of {numPages}
              </span>
              <button
                className="ml-3 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => handleNextPage()}
              >
                <IconCaretRight />
              </button>
            </div>
          )}
          <div className="flex justify-end">
            <a href={cvLink} target="_blank">
              <IconDownload />
            </a>
          </div>
          <Document
            file={pdfDocument}
            onLoadSuccess={onDocumentLoadSuccess}
            wrap={false}
          >
            <Page
              key={`page_${pageNumber}`}
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              onLoadError={console.error}
            />
          </Document>
        </>
      )}
    </Modal>
  )
}

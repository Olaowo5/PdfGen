import Link from "next/link";

export default function Home() {
  return (
    <main className='flex flex-col items-center text-center justify-center gap-5 min-h-screen px-3'>
      <h2 className='text-xl'>Select a playground demo below 👇🏽</h2>
      <nav className='flex flex-col md:flex-row justify-center items-center gap-3 pt-3'>
      <Link
          href='/view-pdf-frame'
          className='border border-slate-800 px-3 py-2 hover:bg-slate-50 font-medium text-sm sm:text-lg'
        >
          View PDF using Iframe
        </Link>
        <Link
          href='/view-pdf-react'
          className='border border-slate-800 px-3 py-2 hover:bg-slate-50 font-medium text-sm sm:text-lg'
        >
          View PDF using React-PDF
        </Link>
        <Link
          href='/view-pdf-react-rend'
          className='border border-slate-800 px-3 py-2 hover:bg-slate-50 font-medium text-sm sm:text-lg'
        >
          Create PDF using React-PDF-renderer
        </Link>
        <Link
          href='/view-pdf-react-rend'
          className='border border-slate-800 px-3 py-2 hover:bg-slate-50 font-medium text-sm sm:text-lg'
        >
          Create PDF  Ola Custom
        </Link>
      </nav>
    </main>
  );
}
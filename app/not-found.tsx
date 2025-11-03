import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='flex flex-col gap-3 justify-center text-center items-center h-screen bg-black text-white'>
      <h1 className='text-6xl'>404</h1>
      <h2 className='text-4xl'>Page Not Found</h2>
      <Link href="/" className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700">Return Home</Link>
    </div>
  );
};

export default NotFound;
import Link from 'next/link'

const Courses = () => {
  return (
    <div className='flex flex-col gap-3 justify-center text-center items-center h-96 m-4'>
      <h1 className='text-6xl'>Courses are not Available yet</h1>
      <Link href="/" className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700">Return Home</Link>
    </div>
  )
}

export default Courses

export const metadata = {
  title: "RK Technical | Courses",
  description: "Raunak Technical Institute",
};
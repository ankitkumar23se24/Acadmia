import Link from "next/link";
import { SiGooglemaps } from "react-icons/si";

const branches = [
    {
        id: 1,
        name: "RK TECHNICAL INSTITUTE & AC TRAINING CENTER",
        director: "KANHAIYA LAL BIND",
        branchcode: "RKAZM/SAR",
        address: "(Main Branch) Sarai Meer, Azamgarh",
        location: "https://maps.app.goo.gl/mEWodnUQoajX2KMZ8"
    },
    {
        id: 2,
        name: "RK TECHNICAL INSTITUTE",
        director: "KANHAIYA LAL BIND",
        branchcode: "RKAZM/MHD",
        address: "Mohammadpur Block Jaunpur, Azamgarh",
        location: "#"
    }
];

const Branches = () => {
  return (
    <div className='flex flex-col items-center py-10'>
      <div className="p-6 min-h-[30rem] max-w-7xl">
            <h1 className="text-5xl font-bold text-center mb-16 italic">Our Branches</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {branches.map((branch) => (
                    <div
                        key={branch.id}
                        className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                        <h2 className="text-xl font-semibold text-blue-600">{branch.name}</h2>
                        <p className="text-gray-600">{branch.address}</p>
                        <p className="text-lg font-medium my-3">Director : {branch.director}</p>
                        <p className="text-lg font-medium my-3">Branch Code : {branch.branchcode}</p>
                        <Link href={branch.location} target='_blank'>
                            <div className="inline-flex items-center justify-center py-2 px-4 border text-green-600 border-green-600 rounded-md hover:bg-green-600 hover:text-white">
                                <SiGooglemaps className="text-3xl" />
                                <p className="text-lg font-semibold px-2">Google Map</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Branches

export const metadata = {
  title: "RK Technical | Branches",
  description: "Raunak Technical Institute",
};
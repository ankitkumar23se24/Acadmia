'use client'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import { format } from 'date-fns';
import Loading from '@/components/Loading';
import { StudentData } from '@/types/StudentData';

type Inputs = {
    registrationNo: string
    dob: string
}

const VerificationForm = () => {
    const { register, handleSubmit, formState: { isSubmitting }, reset } = useForm<Inputs>();
    const [data, setData] = useState<StudentData>()

    const onSubmit: SubmitHandler<Inputs> = async (formData) => {

        // FOR REMOVING / FROM THE REGISTRATION NO
        // formData.registrationNo = formData.registrationNo.replace(/\//g, "")

        try {
            const res = await axios.get(`/api/client/verification?registrationNo=${formData.registrationNo}`)
            if (format(res.data.dateOfBirth, 'yyyy-MM-dd') == formData.dob) {
                setData(res.data)
                reset()
            } else {
                alert("Incorrect Date of Birth")
            }
        } catch (error: unknown) {
            // alert(error?.message || "An error occurred")
            if (error instanceof Error) {
                alert("Error fetching data:" + error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center py-6 mx-2 bg-gray-100 min-h-[600px]">
            <form className="border border-dotted bg-white px-6 py-10 rounded mx-2 w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-3xl font-bold mb-4 text-center">Candidate Details</h2>
                <div className="mb-4">
                    <label htmlFor="registrationNo" className="block text-gray-700 mb-2">Registraion No</label>
                    <input
                        type="text"
                        id="registrationNo"
                        {...register("registrationNo", { required: true })}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="dob" className="block text-gray-700 mb-2">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        {...register("dob", { required: true })}
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                    />
                </div>
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 my-5 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">
                    Verify
                </button>
            </form>

            {isSubmitting && <Loading />}

            {data &&
                <div className="flex flex-col justify-center p-4">
                    <table className="w-full bg-white shadow-md">
                        <thead className="bg-indigo-700 text-white">
                            <tr className="text-left">
                                <th className="py-3 px-3 rounded-tl-lg">Registration No</th>
                                <th className="py-3 px-3 rounded-tr-lg">{data.registrationNo}</th>
                            </tr>
                        </thead>
                        <tbody className='bg-gray-100'>
                            <tr className={`hover:bg-blue-100 transition duration-150 ease-in-out border border-white`}>
                                <td className="py-2 px-3 bg-indigo-100">Certificate No</td>
                                <td className="py-2 px-3">{data.certificateNo}</td>
                            </tr>
                            <tr className={`hover:bg-blue-100 transition duration-150 ease-in-out border border-white`}>
                                <td className="py-2 px-3 bg-indigo-100">Student Name</td>
                                <td className="py-2 px-3">{data.studentName}</td>
                            </tr>
                            <tr className={`hover:bg-blue-100 transition duration-150 ease-in-out border border-white`}>
                                <td className="py-2 px-3 bg-indigo-100">Course Applied</td>
                                <td className="py-2 px-3">{data.courseName}</td>
                            </tr>
                            <tr className={`hover:bg-blue-100 transition duration-150 ease-in-out border border-white`}>
                                <td className="py-2 px-3 bg-indigo-100">Admission Date</td>
                                <td className="py-2 px-3">{format(data.admissionDate, 'yyyy-MM-dd')}</td>
                            </tr>
                            <tr className={`hover:bg-blue-100 transition duration-150 ease-in-out border border-white`}>
                                <td className="py-2 px-3 bg-indigo-100">Session</td>
                                <td className="py-2 px-3">{format(data.admissionDate, 'yyyy-MM-dd')} : {format(data.coursecomplitionDate, 'yyyy-MM-dd')}</td>
                            </tr>
                            <tr className={`hover:bg-blue-100 transition duration-150 ease-in-out border border-white`}>
                                <td className="py-2 px-3 bg-indigo-100">Result </td>
                                <td className="py-2 px-3">{data.result}</td>
                            </tr>
                            <tr className={`hover:bg-blue-100 transition duration-150 ease-in-out border border-white`}>
                                <td className="py-2 px-3 bg-indigo-100">Father&rsquo;s Name </td>
                                <td className="py-2 px-3">{data.fatherName}</td>
                            </tr>
                            <tr className={`hover:bg-blue-100 transition duration-150 ease-in-out border border-white`}>
                                <td className="py-2 px-3 bg-indigo-100">Date of Birth</td>
                                <td className="py-2 px-3">{format(data.dateOfBirth, 'yyyy-MM-dd')}</td>
                            </tr>
                            <tr className={`hover:bg-blue-100 transition duration-150 ease-in-out border border-white`}>
                                <td className="py-2 px-3 bg-indigo-100">Gender</td>
                                <td className="py-2 px-3">{data.gender}</td>
                            </tr>
                            <tr className={`hover:bg-blue-100 transition duration-150 ease-in-out border border-white`}>
                                <td className="py-2 px-3 bg-indigo-100">Contact No</td>
                                <td className="py-2 px-3">{data.contactNo}</td>
                            </tr>
                            <tr className={`hover:bg-blue-100 transition duration-150 ease-in-out border border-white`}>
                                <td className="py-2 px-3 bg-indigo-100">Address</td>
                                <td className="py-2 px-3">{data.address}</td>
                            </tr>
                        </tbody>
                    </table>

                    <br />

                    <table className="w-full bg-white shadow-md">
                        <thead className="bg-orange-300">
                            <tr className="text-center font-semibold text-lg">
                                <td className="py-3 px-3 rounded-t-md" colSpan={2}>Study Center Details</td>
                            </tr>
                        </thead>
                        <tbody className='bg-gray-100'>
                            <tr className={`hover:bg-orange-100 transition duration-150 ease-in-out border border-white`}>
                                <td className="py-2 px-3 bg-orange-100">Study Center</td>
                                <td className="py-2 px-3">{data.studyCenter}</td>
                            </tr>
                            <tr className={`hover:bg-orange-100 transition duration-150 ease-in-out border border-white`}>
                                <td className="py-2 px-3 bg-orange-100">Director Name</td>
                                <td className="py-2 px-3">{data.directorName}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }

        </div>
    )
}

export default VerificationForm
import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import { StudentData } from '@/types/StudentData';


const EditStudentDetail = () => {
    const { control, handleSubmit, setValue, reset, formState: { isSubmitting, isSubmitSuccessful } } = useForm<StudentData>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(" ");

    const [_id, set_id] = useState()

    const handleRegistrationNoChange = async (registrationNo: string) => {
        if (!registrationNo) return;

        setLoading(true);
        setError("");

        try {
            const res = await axios.get(`/api/client/verification?registrationNo=${registrationNo}`);
            const details = res.data;
            set_id(details._id)
            if (Object.keys(details).length === 0) {
                setError("No details found for the entered registration number.");
                reset(); // Clear the form if no details are found
            } else {
                Object.entries(details).forEach(([key, value]) => {
                    // setValue(key , value);
                    setValue(key as keyof StudentData, value as string | Date);
                });
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                console.error("Unexpected error:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    const onSubmit: SubmitHandler<StudentData> = async (data) => {
        try {
            await axios.patch(`/api/admin/student?id=${_id}`, data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Add the Bearer token to the Authorization header
                    }
                }
            )
            reset();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        <h1 className='text-center font-bold text-3xl pb-6 text-red-600'>Edit Student Details</h1>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className='border border-dotted bg-gray-50 px-6 py-10 rounded'>
                    <div className="flex">
                        <label htmlFor="registrationNo" className="block text-gray-700 w-full">Registraion No</label>
                        <Controller
                            name="registrationNo"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id="registrationNo"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleRegistrationNoChange(e.target.value);
                                    }}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                    </div>

                    {loading && <p className="text-blue-500 mb-4">Loading details...</p>}
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <div className="mt-2 flex">
                        <label htmlFor="certificateNo" className="block text-gray-700 w-full">Certificate No</label>
                        <Controller
                            name="certificateNo"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id="certificateNo"
                                    {...field}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="courseName" className="block text-gray-700 w-full">Course Name</label>
                        <Controller
                            name="courseName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id="courseName"
                                    {...field}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="courseDuration" className="block text-gray-700 w-full">Course Duration</label>
                        <Controller
                            name="courseDuration"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id="courseDuration"
                                    {...field}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="admissionDate" className="block text-gray-700 w-full">Admission Date</label>
                        <Controller
                            name="admissionDate"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id="admissionDate"
                                    {...field}
                                    value={typeof field.value === 'string' ? field.value : field.value.toISOString().split('T')[0]}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="coursecomplitionDate" className="block text-gray-700 w-full">Course Complition Date</label>
                        <Controller
                            name="coursecomplitionDate"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id="coursecomplitionDate"
                                    {...field}
                                    value={typeof field.value === 'string' ? field.value : field.value.toISOString().split('T')[0]}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="result" className="block text-gray-700 w-full">Result</label>
                        <Controller
                            name="result"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id="result"
                                    {...field}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="studyCenter" className="block text-gray-700 w-full">Study Center</label>
                        <Controller
                            name="studyCenter"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id="studyCenter"
                                    {...field}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="directorName" className="block text-gray-700 w-full">Director Name</label>
                        <Controller
                            name="directorName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id="directorName"
                                    {...field}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                    </div>
                </div>

                <div className='border border-dotted bg-gray-50 px-6 py-10 rounded'>
                    <div className="flex">
                        <label className="block text-gray-700 w-full" htmlFor="studentName">
                            Full Name
                        </label>
                        <Controller
                            name="studentName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id="studentName"
                                    {...field}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label className="block text-gray-700 w-full" htmlFor="fatherName">
                            Father Name
                        </label>
                        <Controller
                            name="fatherName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id="fatherName"
                                    {...field}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label className="block text-gray-700 w-full" htmlFor="motherName">
                            Mother Name
                        </label>
                        <Controller
                            name="motherName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id="motherName"
                                    {...field}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label className="block text-gray-700 w-full" htmlFor="address">
                            Address
                        </label>
                        <Controller
                            name="address"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id="address"
                                    {...field}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label className="block text-gray-700 w-full" htmlFor="contactNo">
                            Contact No
                        </label>
                        <Controller
                            name="contactNo"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id="contactNo"
                                    {...field}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="dateOfBirth" className="block text-gray-700 w-full">Date of Birth</label>
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id="dateOfBirth"
                                    {...field}
                                    value={typeof field.value === 'string' ? field.value : field.value.toISOString().split('T')[0]}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="gender" className="block text-gray-700 w-full"> Gender </label>
                        <Controller
                            name="gender"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id="gender"
                                    {...field}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="aadhaarCardNo" className="block text-gray-700 w-full"> Aadhaar Card No </label>
                        <Controller
                            name="aadhaarCardNo"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id="aadhaarCardNo"
                                    {...field}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="highestQualification" className="block text-gray-700 w-full"> Highest Qualification </label>
                        <Controller
                            name="highestQualification"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    id="highestQualification"
                                    {...field}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <button type="submit" disabled={isSubmitting}
                        className=" bg-indigo-600 text-white px-5 py-2 my-2 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">
                        Edit Student Details
                    </button>
                </div>
                {isSubmitting && <div className="text-center py-2 my-2 text-green-600 font-semibold text-md italic"> Submitting</div>}
                {isSubmitSuccessful && <div className="text-center py-2 my-2 text-green-700 font-semibold text-md italic"> Submitted Successfully</div>}
            </form>
        </>
    );
}

export default EditStudentDetail;
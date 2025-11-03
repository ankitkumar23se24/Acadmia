import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import { StudentData } from '@/types/StudentData';

const RegistrationForm = () => {
    const [error, setError] = useState(" ");
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm<StudentData>();
    const onSubmit: SubmitHandler<StudentData> = async (formData) => {
        try {
            await axios.post(`/api/admin/student`, formData)
            // Reset the form after successful submission
            reset();
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    const centers = [
        {
            name: "RK Technical Institute, Saraimeer, Azamgarh",
            director: "Kanhaiya Lal Bind"
        },
        {
            name: "RK Technical Institute, Mohammadpur, Azamgarh",
            director: "Kanhaiya Lal Bind"
        }
    ];

    return (
        <>
        <h1 className='text-center font-bold text-3xl pb-6 text-red-600'>Registration Form</h1>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit(onSubmit)}>
                <div className='border border-dotted bg-gray-50 px-6 py-10 rounded'>
                    <div className="flex">
                        <label htmlFor="registrationNo" className="block text-gray-700 w-full">Registraion No</label>
                        <input
                            type="text"
                            id="registrationNo"
                            {...register("registrationNo", { required: true })}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="certificateNo" className="block text-gray-700 w-full">Certificate No</label>
                        <input
                            type="text"
                            id="certificateNo"
                            {...register("certificateNo", { required: true })}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="courseName" className="block text-gray-700 w-full">Course Name</label>
                        <input
                            type="text"
                            id="courseName"
                            {...register("courseName", { required: true })}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="courseDuration" className="block text-gray-700 w-full">Course Duration</label>
                        <input
                            type="text"
                            id="courseDuration"
                            {...register("courseDuration", { required: true })}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="admissionDate" className="block text-gray-700 w-full">Admission Date</label>
                        <input
                            type="date"
                            id="admissionDate"
                            {...register("admissionDate", { required: true })}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="coursecomplitionDate" className="block text-gray-700 w-full">Course Complition Date</label>
                        <input
                            type="date"
                            id="coursecomplitionDate"
                            {...register("coursecomplitionDate", { required: true })}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="result" className="block text-gray-700 w-full">Result</label>
                        <input
                            type="text"
                            id="result"
                            {...register("result", { required: true })}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="studyCenter" className="block text-gray-700 w-full">Study Center</label>
                        <select
                            id="studyCenter"
                            {...register("studyCenter", { required: true })}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        >
                            {centers.map((center, index) => (
                                <option key={index} value={center.name}>{center.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="directorName" className="block text-gray-700 w-full">Director Name</label>
                        <select
                            id="directorName"
                            {...register("directorName", { required: true })}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        >
                            {centers.map((center, index) => (
                                <option key={index} value={center.director}>{center.director}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='border border-dotted bg-gray-50 px-6 py-10 rounded'>
                    <div className="flex">
                        <label className="block text-gray-700 w-full" htmlFor="studentName">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="studentName"
                            {...register("studentName", { required: true, minLength: { value: 3, message: "Name can not be less than 3 character" } })}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" />
                    </div>
                    {errors.studentName && <div className="text-red-500 font-semibold text-md"> {errors.studentName.message} </div>}
                    <div className="mt-2 flex">
                        <label className="block text-gray-700 w-full" htmlFor="fatherName">
                            Father Name
                        </label>
                        <input
                            type="text"
                            id="fatherName"
                            {...register("fatherName", { required: true, minLength: { value: 3, message: "Name can not be less than 3 character" } })}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" />
                    </div>
                    {errors.fatherName && <div className="text-red-500 font-semibold text-md"> {errors.fatherName.message} </div>}
                    <div className="mt-2 flex">
                        <label className="block text-gray-700 w-full" htmlFor="motherName">
                            Mother Name
                        </label>
                        <input
                            type="text"
                            id="motherName"
                            {...register("motherName", { required: true, minLength: { value: 3, message: "Name can not be less than 3 character" } })}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" />
                    </div>
                    {errors.motherName && <div className="text-red-500 font-semibold text-md"> {errors.motherName.message} </div>}
                    <div className="mt-2 flex">
                        <label className="block text-gray-700 w-full" htmlFor="address">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            {...register("address", { required: "Address can not be blank" })}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" />
                    </div>
                    {errors.address && <div className="text-red-500 font-semibold text-md"> {errors.address.message} </div>}
                    <div className="mt-2 flex">
                        <label className="block text-gray-700 w-full" htmlFor="contactNo">
                            Contact No
                        </label>
                        <input
                            type="tel"
                            id="contactNo"
                            {...register("contactNo", { required: true, minLength: { value: 10, message: "Invalid Contact No" }, maxLength: { value: 12, message: "Invalid Contact No" } })}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200" />
                    </div>
                    {errors.contactNo && <div className="text-red-500 font-semibold text-md"> {errors.contactNo.message} </div>}
                    <div className="mt-2 flex">
                        <label htmlFor="dateOfBirth" className="block text-gray-700 w-full">Date of Birth</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            {...register("dateOfBirth", { required: true })}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="gender" className="block text-gray-700 w-full"> Gender </label>
                        <select
                            id="gender"
                            {...register("gender", { required: "Gender is required" })}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        >
                            {/* <option value="">Select Gender</option> */}
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mt-2 flex">
                        <label htmlFor="aadhaarCardNo" className="block text-gray-700 w-full"> Aadhaar Card No </label>
                        <input
                            type="tel"
                            id="aadhaarCardNo"
                            {...register("aadhaarCardNo", {
                                required: "Aadhaar Card No is required",
                                pattern: {
                                    value: /^[0-9]{12}$/,
                                    message: "Aadhaar Card No must be 12 digits",
                                },
                            })}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    {errors.aadhaarCardNo && (
                        <div className="text-red-500 font-semibold text-md">
                            {errors.aadhaarCardNo.message}
                        </div>
                    )}
                    <div className="mt-2 flex">
                        <label htmlFor="highestQualification" className="block text-gray-700 w-full"> Highest Qualification </label>
                        <select
                            id="highestQualification"
                            {...register("highestQualification", { required: true })}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                        >
                            <option value="High School">High School</option>
                            <option value="Intermediate">Intermediate(10+2)</option>
                            <option value="Graduated">Graduated</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <button type="submit" disabled={isSubmitting}
                        className=" bg-indigo-600 text-white px-5 py-2 my-2 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">
                        Register Student
                    </button>
                </div>
                {isSubmitting && <div className="text-center py-2 my-2 text-green-600 font-semibold text-md italic"> Submitting</div>}
                {isSubmitSuccessful && <div className="text-center py-2 my-2 text-green-700 font-semibold text-md italic"> Registered Successfully</div>}
                {error && <div className="text-center py-2 my-2 text-red-600 font-semibold text-md italic">{error}</div>}
            </form>
        </>
    );
}

export default RegistrationForm
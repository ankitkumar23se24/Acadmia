import mongoose from "mongoose";

const studentDataSchema = new mongoose.Schema({
    registrationNo: {
        type: String,
        required: true,
        unique: true
    },
    certificateNo: {
        type: String,
        required: true,
        unique: true
    },
    studentName: {
        type: String,
        required: true,
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String
    },
    address: {
        type: String
    },
    contactNo: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    aadhaarCardNo: {
        type: String,
        required: true
    },
    highestQualification: {
        type: String,
    },
    courseName: {
        type: String,
        required: true
    },
    courseDuration: {
        type: String,
        required: true
    },
    admissionDate: {
        type: Date,
        required: true
    },
    coursecomplitionDate: {
        type: Date,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    studyCenter: {
        type: String
    },
    directorName: {
        type: String
    }
}, { timestamps: true });

export const StudentDetail = mongoose.models?.StudentDetail || mongoose.model("StudentDetail", studentDataSchema);
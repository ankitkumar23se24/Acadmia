import { NextResponse } from "next/server";
import { Types } from "mongoose";
import connectDB from "@/lib/connectDB";
import { StudentDetail } from "@/models/studentDetailModel";

export const GET = async () => {

    try {
        // This is for fetching all students
        const Students = await StudentDetail.find()
        return new NextResponse(
            JSON.stringify(Students),
            { status: 200 }
        )
    } catch (err: unknown) {
        return new NextResponse("Error in fetching Students Data " + (err as Error).message, { status: 500 })
    }
}

export const POST = async (req: Request) => {

    try {
        const body = await req.json()
        await connectDB()
        const newStudent = new StudentDetail(body)
        await newStudent.save()
        return new NextResponse(
            JSON.stringify({ message: "Student is created", student: newStudent }),
            { status: 201 }
        )
    } catch (err: unknown) {
        return new NextResponse("Error in creating Student " + (err as Error).message, { status: 500 })
    }
}

export const PATCH = async (req: Request) => {

    try {
        const { searchParams } = new URL(req.url)
        const studentId = searchParams.get("id")

        if (!studentId) {
            return new NextResponse(
                JSON.stringify({ message: "ID not found" }),
                { status: 400 }
            )
        }

        if (!Types.ObjectId.isValid(studentId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid Student ID" }),
                { status: 400 }
            )
        }

        const body = await req.json()

        await connectDB()

        const updatedStudent = await StudentDetail.findByIdAndUpdate(new Types.ObjectId(studentId), body, {
            new: true,
            runValidators: true
        })

        if (!updatedStudent) {
            return new NextResponse(
                JSON.stringify({ message: "Student not found" }),
                { status: 404 }
            )
        }

        return new NextResponse(
            JSON.stringify({ message: "Student is updated", student: updatedStudent }),
            { status: 200 }
        )

    } catch (err: unknown) {
        return new NextResponse("Error in updating Student " + (err as Error).message, { status: 500 })
    }
}

export const DELETE = async (req: Request) => {

    try {
        const { searchParams } = new URL(req.url)
        const studentId = searchParams.get("id")

        if (!studentId) {
            return new NextResponse(
                JSON.stringify({ message: "ID not found" }),
                { status: 400 }
            )
        }

        if (!Types.ObjectId.isValid(studentId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid Student ID" }),
                { status: 400 }
            )
        }

        await connectDB()

        const deletedStudent = await StudentDetail.findByIdAndDelete(new Types.ObjectId(studentId))

        if (!deletedStudent) {
            return new NextResponse(
                JSON.stringify({ message: "Student not found" }),
                { status: 404 }
            )
        }

        return new NextResponse(
            JSON.stringify({ message: "Student is deleted", student: deletedStudent }),
            { status: 200 }
        )

    } catch (err: unknown) {
        return new NextResponse("Error in deleting Student " + (err as Error).message, { status: 500 })
    }
}
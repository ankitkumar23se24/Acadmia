import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import { StudentDetail } from "@/models/studentDetailModel";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url)
    const registrationNo = searchParams.get("registrationNo")

    try {
        await connectDB()

        const Student = await StudentDetail.findOne({ registrationNo: registrationNo })
        if (!Student) {
            return new NextResponse(
                JSON.stringify({ message: "Student not found" }),
                { status: 404 }
            )
        }
        return new NextResponse(
            JSON.stringify(Student),
            { status: 200 }
        )

    } catch (err: unknown) {
        const errorMessage = (err as Error).message;
        return new NextResponse("Error in fetching Student Data " + errorMessage, { status: 500 })
    }
}
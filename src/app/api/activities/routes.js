import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Activity from "@/models/Activities";

export const GET = async (request) => {
    try {
        await connect();
        const activities = await Activity.find();
        return new NextResponse(JSON.stringify(activities), { status: 200 });
    } catch (error) {
        return new NextResponse("Erreur de base de données", { status: 500 });
    }
};

export const POST = async (request) => {
    try {
        await connect();
        const body = await request.json();

        const newActivity = new Activity(body);
        const savedActivity = await newActivity.save();

        return new NextResponse(JSON.stringify(savedActivity), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new NextResponse(error.message, { status: 400 });
    }
};

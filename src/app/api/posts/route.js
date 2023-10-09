import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "../../../models/Post";

export const GET = async (resquest) => {
    //fetch : récupération des données de mongodb
    try {
        await connect();
        const posts = await Post.find();
        return new NextResponse(posts, { status: 200 });
    } catch (error) {
        return new NextResponse("database Error!", { status: 500 });
    }
};

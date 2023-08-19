import { NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";

export const GET = async (request) => {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");

  try {
    await connect();

    let users;

    if (email) {
      users = await User.find({ email });
    } else {
      users = await User.find();
    }

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PATCH = async (request) => {
  const { email, newData } = await request.json();

  try {
    await connect();
    const updatedUser = await User.findOneAndUpdate({ email }, newData, {
      new: true,
    });

    if (!updatedUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    return new NextResponse(
      JSON.stringify({
        message: "Profile updated successfully",
        user: updatedUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

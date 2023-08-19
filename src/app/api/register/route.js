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

export const POST = async (request) => {
  const {
    name,
    email,
    profilePicture,
    phoneNumber,
    about,
    skills,
    professionalDetails,
    certifications,
    experience,
    education,
    password,
  } = await request.json();

  await connect();

  const newUser = new User({
    name,
    email,
    profilePicture,
    phoneNumber,
    about,
    skills,
    professionalDetails,
    certifications,
    experience,
    education,
    password,
  });

  try {
    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};

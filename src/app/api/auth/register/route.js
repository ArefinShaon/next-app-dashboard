import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

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

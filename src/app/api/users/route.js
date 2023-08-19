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


export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, updatedData } = req.body;

  try {
    await connect();

    const updatedUser = await User.findOneAndUpdate({ email }, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user data:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
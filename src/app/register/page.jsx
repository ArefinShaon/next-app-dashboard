/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import swal from "sweetalert2";
import { AuthContext } from "@/provider/AuthProvider/AuthProvider";

const page = () => {
  const router = useRouter();
  const { createUser } = useContext(AuthContext);

  // const [userData, setUserData] = useState({
  //   name: "",
  //   email: "",
  //   password:"",
  //   profilePicture: "",
  //   phoneNumber: "",
  //   about: "",
  //   skills: [],
  //   professionalDetails: "",
  //   certifications: [],
  //   experience: "",
  //   education: "",
  // });

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setUserData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleArrayChange = (event, field) => {
  //   const { value } = event.target;
  //   setUserData((prevData) => ({
  //     ...prevData,
  //     [field]: value.split(",").map((item) => item.trim()),
  //   }));
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const form = event.target;
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const name = data.name;
    const profilePicture = data.profilePicture;
    const email = data.email;
    const phoneNumber = data.phoneNumber;
    const about = data.about;
    const skills = data.skills;
    const professionalDetails = data.professionalDetails;
    const certifications = data.certifications;
    const experience = data.experience;
    const education = data.education;
    const password = data.password;

    const addUser = {
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
    };

    try {
      // Create user using createUser function
      const createUserResult = await createUser(email, password);
      const createdUser = createUserResult.user;
      console.log(createdUser);

      // Update user profile using updateUserProfile function
      // await updateUserProfile({
      //   displayName: name,
      //   photoURL: profilePicture,
      // });

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addUser),
      });

      if (res.status === 201) {
        swal.fire({
          icon: "success",
          title: "Good job!",
          text: "Successfully create an account",
        });

        form.reset();
        router.push("/login");
      }
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen pt-0 md:pt-8 bg-blue-300 flex items-center justify-center">
      <div className="bg-blue-100 p-8  shadow-md w-full md:w-2/3">
        <h2 className="text-2xl text-center font-semibold mb-4">
          Create An Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="mt-1 p-2 w-full border rounded-md"
              id="name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
              id="email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              id="password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium"
            >
              Profile Picture URL
            </label>
            <input
              type="text"
              name="profilePicture"
              className="mt-1 p-2 w-full border rounded-md"
              id="profilePicture"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              className="mt-1 p-2 w-full border rounded-md"
              id="phoneNumber"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="about" className="block text-sm font-medium">
              About
            </label>
            <textarea
              name="about"
              className="mt-1 p-2 w-full border rounded-md"
              id="about"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="skills" className="block text-sm font-medium">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              name="skills"
              className="mt-1 p-2 w-full border rounded-md"
              id="skills"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="professionalDetails"
              className="block text-sm font-medium"
            >
              Professional Details
            </label>
            <input
              type="text"
              name="professionalDetails"
              className="mt-1 p-2 w-full border rounded-md"
              id="professionalDetails"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="certifications"
              className="block text-sm font-medium"
            >
              Certifications (comma-separated)
            </label>
            <input
              type="text"
              name="certifications"
              className="mt-1 p-2 w-full border rounded-md"
              id="certifications"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="experience" className="block text-sm font-medium">
              Experience
            </label>
            <input
              type="text"
              name="experience"
              className="mt-1 p-2 w-full border rounded-md"
              id="experience"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="education" className="block text-sm font-medium">
              Education
            </label>
            <input
              type="text"
              name="education"
              className="mt-1 p-2 w-full border rounded-md"
              id="education"
              required
            />
          </div>
          <div className="flex justify-center">
            <input type="submit">
              <button className="btn bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-64 text-center mt-4">
                {" "}
                Register
              </button>
            </input>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p>Already have an account?</p>
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;

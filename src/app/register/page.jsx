"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import swal from 'sweetalert2';
import { AuthContext } from "@/provider/AuthProvider/AuthProvider";


const RegistrationPage = () => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password:"",
    profilePicture: "",
    phoneNumber: "",
    about: "",
    skills: [],
    professionalDetails: "",
    certifications: [],
    experience: "",
    education: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayChange = (event, field) => {
    const { value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const profilePicture = form.profilePicture.value;
    const email = form.email.value;
    const phoneNumber = form.phoneNumber.value;
    const about = form.about.value;
    const skills = form.skills.value;
    const professionalDetails = form.professionalDetails.value;
    const certifications = form.certifications.value;
    const experience = form.experience.value;
    const education = form.education.value;
    const password = form.password.value;
  
    try {
      // Create user using createUser function
      const createUserResult = await createUser(email, password);
      const createdUser = createUserResult.user;
      console.log(createdUser);
  
      // Update user profile using updateUserProfile function
      await updateUserProfile({
        displayName: name,
        photoURL: profilePicture,
      });
  
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
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
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="mt-1 p-2 w-full border rounded-md"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Profile Picture URL
            </label>
            <input
              type="text"
              name="profilePicture"
              className="mt-1 p-2 w-full border rounded-md"
              value={userData.profilePicture}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              className="mt-1 p-2 w-full border rounded-md"
              value={userData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">About</label>
            <textarea
              name="about"
              className="mt-1 p-2 w-full border rounded-md"
              value={userData.about}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              name="skills"
              className="mt-1 p-2 w-full border rounded-md"
              value={userData.skills.join(", ")}
              onChange={(e) => handleArrayChange(e, "skills")}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Professional Details
            </label>
            <input
              type="text"
              name="professionalDetails"
              className="mt-1 p-2 w-full border rounded-md"
              value={userData.professionalDetails}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Certifications (comma-separated)
            </label>
            <input
              type="text"
              name="certifications"
              className="mt-1 p-2 w-full border rounded-md"
              value={userData.certifications.join(", ")}
              onChange={(e) => handleArrayChange(e, "certifications")}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Experience</label>
            <input
              type="text"
              name="experience"
              className="mt-1 p-2 w-full border rounded-md"
              value={userData.experience}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Education</label>
            <input
              type="text"
              name="education"
              className="mt-1 p-2 w-full border rounded-md"
              value={userData.education}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="text-red-500">Something went wrong: {error.message}</p>}
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-64 text-center mt-4"
            >
              Register
            </button>
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

export default RegistrationPage;

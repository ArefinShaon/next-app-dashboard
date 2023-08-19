/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "@/provider/AuthProvider/AuthProvider";
import Swal from 'sweetalert2';

const page = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting traditionally
    const form = e.target;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
        Swal.fire({
          icon: "success",
          title: "Good job!",
          text: "Successfully Log In",
        }).then(() => {
          form.reset();
          router.push("/");
        });
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="p-2 border rounded-md w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-2 border rounded-md w-full"
            required
          />
          <button className="btn btn-primary w-full">Login</button>
        </form>
        <label className="label text-purple-700">
          {error && <p className="text-red-500">{error}</p>}
        </label>{" "}
        <span className="text-gray-600">- OR -</span>
        <Link href="/register" className="text-blue-500">
          Create new account
        </Link>
      </div>
    </div>
  );
};

export default page;

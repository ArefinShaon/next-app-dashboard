"use client";
import React, { useContext, useRef } from "react";
import title from "/public/title.png";
import svg from "/public/menu.svg";
import Image from "next/image";
import Link from "next/link";
import { FaWindowClose } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/provider/AuthProvider/AuthProvider";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();
  const ref = useRef();
  const { user, logOut } = useContext(AuthContext);
  console.log(user);
  const router = useRouter();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        router.push("/");
      })
      .catch((error) => console.log(error));
  };
  const toggleClose = () => {
    if (ref.current.classList.contains("-translate-x-full")) {
      ref.current.classList.remove("-translate-x-full");
      ref.current.classList.add("-translate-x-0");
    } else if (!ref.current.classList.contains("-translate-x-full")) {
      ref.current.classList.remove("-translate-x-0");
      ref.current.classList.add("-translate-x-full");
    }
  };

  return (
    <div>
      <div
        ref={ref}
        className="sidebar w-56 md:w-72 absolute top-0 left-0 bg-white p-8 transform transition-transform -translate-x-full h-[100vh] border border-l-0 ">
        <h1 className="text-xl font-semibold md:font-bold ms-0 md:ms-6 mb-8 ">
          <span className="text-black border  px-4 py-2 rounded-md">
            Dashboard
          </span>
        </h1>
        <span
          onClick={toggleClose}
          className="absolute top-5 right-1   cursor-pointer text-3xl text-orange-600"
        >
          {" "}
          <FaWindowClose></FaWindowClose>
        </span>
        <ul>
          <>
          {user ? (
          <><li className="flex justify-start items-center mt-6 gap-4">
                <span className="-mx-4 pr-3 md:pr-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                  >
                    <path
                      d="M6.11108 10.7778L9.66664 7.22223L6.11108 3.66667"
                      stroke="#9197B3"
                      strokeWidth="1.77778"
                      strokeLinecap="round"
                      strokeLinejoin="round" />
                  </svg>
                </span>
                <Link
                  className={pathname == "/"
                    ? "borders  px-4 py-2 rounded-md text-black  font-semibold"
                    : " text-black px-4 py-2  font-semibold"}
                  href="/"
                >
                  Home{" "}
                </Link>
              </li><li className="flex justify-start items-center mt-4 gap-4">
                  <span className="-mx-4 pr-3 md:pr-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <path
                        d="M6.11108 10.7778L9.66664 7.22223L6.11108 3.66667"
                        stroke="#9197B3"
                        strokeWidth="1.77778"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Link
                    className={pathname == "/profile"
                      ? "borders  px-4 py-2 rounded-md text-black  font-semibold"
                      : " text-black px-4 py-2  font-semibold"}
                    href="/profile"
                  >
                    My Profile
                  </Link>
                </li><li className="flex justify-start items-center mt-6 gap-4">
                  <span className="-mx-4 pr-3 md:pr-6 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <path
                        d="M6.11108 10.7778L9.66664 7.22223L6.11108 3.66667"
                        stroke="#9197B3"
                        strokeWidth="1.77778"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                    </svg>
                  </span>

                  <Link
                    className={pathname == "/connection"
                      ? "borders  px-4 py-2 rounded-md text-black  font-semibold"
                      : " text-black px-4 py-2 font-semibold"}
                    href="/connection"
                  >
                    My Connections
                  </Link>
                </li></>
            ) : (
              <li className="flex justify-start items-center mt-6 gap-4">
              <span className="-mx-4 pr-3 md:pr-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path
                    d="M6.11108 10.7778L9.66664 7.22223L6.11108 3.66667"
                    stroke="#9197B3"
                    strokeWidth="1.77778"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <Link
                className={
                  pathname == "/"
                    ? "borders  px-4 py-2 rounded-md text-black  font-semibold"
                    : " text-black px-4 py-2  font-semibold"
                }
                href="/"
              >
                Home{" "}
              </Link>
              </li>
                )}
          </>
         
          <li className="mx-auto ps-4 mt-44 md:mt-80">
          {user ? (
              <button
                className="btn font-bold btn-ghost"
                onClick={handleLogOut}
              >
                Logout
              </button>
              ) : (
              <Link className="btn font-bold btn-ghost" href={"/login"}>
                Log In
              </Link>
              )}
            </li>
            
        </ul>
       
      </div>
      <div className="navbar  bg-white border border-l-0">
        <div className="flex-none">
          <p onClick={toggleClose} className="btn btn-ghost">
            <Image src={svg} alt="Menu"></Image>
          </p>
        </div>
        <div className="flex-1">
          <Image
            src={title}
            alt="Title"
            className="btn btn-ghost w-24 md:w-28"
          ></Image>
        </div>
        <div className="flex-none">
          <div className="px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="25"
              viewBox="0 0 26 25"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.1223 20.8458C11.6525 21.4364 12.3332 21.7608 13.0395 21.7608H13.0405C13.7498 21.7608 14.4336 21.4364 14.9648 20.8447C15.2494 20.5305 15.7345 20.5049 16.0488 20.7884C16.364 21.072 16.3896 21.5582 16.1061 21.8724C15.279 22.7905 14.191 23.2962 13.0405 23.2962H13.0384C11.891 23.2952 10.805 22.7895 9.98105 21.8714C9.69752 21.5571 9.72311 21.071 10.0384 20.7884C10.3536 20.5039 10.8388 20.5295 11.1223 20.8458ZM13.0904 1.28946C17.6402 1.28946 20.6966 4.83306 20.6966 8.14225C20.6966 9.84445 21.1296 10.5661 21.5891 11.3317C22.0436 12.0871 22.5585 12.9448 22.5585 14.5662C22.2012 18.7086 17.8767 19.0463 13.0904 19.0463C8.30424 19.0463 3.97863 18.7086 3.62549 14.6317C3.62243 12.9448 4.13729 12.0871 4.59175 11.3317L4.75219 11.0616C5.14722 10.3827 5.4843 9.64419 5.4843 8.14225C5.4843 4.83306 8.54068 1.28946 13.0904 1.28946ZM13.0904 2.82481C9.51307 2.82481 7.01966 5.62734 7.01966 8.14225C7.01966 10.2703 6.42906 11.2539 5.90704 12.1219C5.4884 12.8189 5.15778 13.3696 5.15778 14.5662C5.32872 16.4966 6.60306 17.511 13.0904 17.511C19.542 17.511 20.8563 16.4516 21.0262 14.4996C21.0231 13.3696 20.6925 12.8189 20.2739 12.1219C19.7518 11.2539 19.1612 10.2703 19.1612 8.14225C19.1612 5.62734 16.6678 2.82481 13.0904 2.82481Z"
                fill="#1E2875"
              />
            </svg>
          </div>
          <div>
            {user ? (
              <div className="flex gap-3 px-4 justify-center py-2 rounded-md text-black items-center borders">
                <div>
                  {user.photoURL && (
                    <Image
                      src={user.photoURL}
                      height={200}
                      width={200}
                      alt="Profile"
                      className="w-8 h-8 rounded-md"
                    />
                  )}
                </div>
                <div className="hidden md:flex flex-col">
                  <h1 className="text-sm">Welcome Back</h1>
                  {user.displayName && (
                    <p className="font-semibold">{user.displayName}</p>
                  )}
                </div>
              </div>
            ) : (
              <Link className="btn font-bold btn-ghost" href={"/login"}>
                LogIn
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const page = () => {
  const initialUsers = [
    {
      id: 1,
      name: "Arefin Shawn",
      about: "Passionate developer",
      photo:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      connected: false,
    },
    {
      id: 2,
      name: "Arefin Shaon",
      about: "Passionate developer",
      photo:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      connected: false,
    },
    {
      id: 3,
      name: "Arefin Shaon",
      about: "Passionate developer",
      photo:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      connected: false,
    },
    {
      id: 4,
      name: "Arefin Shaon",
      about: "Passionate developer",
      photo:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      connected: false,
    },
    {
      id: 5,
      name: "Arefin Shaon",
      about: "Passionate developer",
      photo:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      connected: false,
    },
    {
      id: 6,
      name: "Arefin Shaon",
      about: "Passionate developer",
      photo:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      connected: false,
    },
    {
      id: 7,
      name: "Arefin Shaon",
      about: "Passionate developer",
      photo:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      connected: false,
    },
    {
      id: 8,
      name: "Arefin Shaon",
      about: "Passionate developer",
      photo:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      connected: false,
    },
    {
      id: 9,
      name: "Arefin Shaon",
      about: "Passionate developer",
      photo:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      connected: false,
    },
    {
      id: 10,
      name: "Arefin Shaon",
      about: "Passionate developer",
      photo:
        "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
      connected: false,
    },
  ];

    const [users, setUsers] = useState(initialUsers);
    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users"));
        if (storedUsers) {
          setUsers(storedUsers);
        }
      }, []);

  const handleToggleConnection = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, connected: !user.connected };
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setUsers(updatedUsers);
  };

  const connectedUsers = users.filter((user) => user.connected);
  const nonConnectedUsers = users.filter((user) => !user.connected);

  return (
    <div className="bg-gray-100 ">
      <div className=" mx-auto w-5/6 md:w-4/6 ps-0 md:ps-12 py-4">
        <h1 className="text-white profile-bg text-xl md:text-3xl font-bold p-8 ps-8 md:ps-36">
          My Connection
        </h1>
        <ul>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {connectedUsers.map((user) => (
              <li
                key={user.id}
                className="bg-white mt-4 flex justify-between rounded-md p-4 mb-4"
              >
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-sm my-2">{user.about}</p>
                  <p
                    className="border rounded-xl cursor-pointer p-2 text-sm bg-red-300 "
                    onClick={() => handleToggleConnection(user.id)}
                  >
                    Remove Connection
                  </p>
                </div>
                <Image
                  src={user.photo}
                  width={200}
                  height={200}
                  alt="Images"
                  className="w-12 md:w-20 h-12 md:h-20 rounded-full"
                />
              </li>
            ))}
          </div>
          <div className="mt-8 text-xl font-bold mb-6">
            <h1 className="text-center">People You want to connect</h1>
          </div>{" "}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nonConnectedUsers.map((user) => (
              <li
                key={user.id}
                className="bg-white mt-4 flex justify-between rounded-md p-4 mb-4"
              >
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-sm my-2">{user.about}</p>
                  <p
                    className="border rounded-xl p-2 text-sm cursor-pointer bg-green-300"
                    onClick={() => handleToggleConnection(user.id)}
                  >
                    Add Connection
                  </p>
                </div>
                {user.photo && <Image
                  src={user.photo}
                  width={200}
                  height={200}
                  alt="Images"
                  className="w-12 md:w-20 h-12 md:h-20 rounded-full"
                />}
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default page;


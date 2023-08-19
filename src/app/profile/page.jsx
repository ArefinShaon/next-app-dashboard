"use client";
import { useContext, useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import { AuthContext } from "@/provider/AuthProvider/AuthProvider";
import Modal from "react-modal";
import Swal from "sweetalert2";
import axios from "axios";

const ProfilePage = () => {
  const [items, setItems] = useState([]);
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userEmail) {
      fetch(`/api/users?email=${userEmail}`)
        .then((response) => response.json())
        .then((fetchedItems) => {
          setItems(fetchedItems);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user-specific items:", error);
          setIsLoading(false);
        });
    }
  }, [userEmail]);

  const [isEditOpen, setIsEditOpen] = useState(false);
    const [editedData, setEditedData] = useState({});
console.log(editedData);

  const openEditPopup = (data) => {
    setIsEditOpen(true);
    setEditedData(data);
  };

  const closeEditPopup = () => {
    setIsEditOpen(false);
    setEditedData({});
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/users?email=${userEmail}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newData: newData,
        }),
      });
        console.log(newData);
      if (response.ok) {
        const responseData = await response.json();
        setMessage(responseData.message);

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Update Successful",
          text: responseData.message,
        }).then(() => {
          // Perform any necessary cleanup or actions after success
        });
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="profile-bg mx-auto  h-40 md:h-56 w-96 md:w-3/5">
        <h1 className="text-white text-xl md:text-3xl font-bold p-8 ps-8 md:ps-36">
          My Profile
        </h1>
        {items.map((item, index) => (
          <div
            key={item._id}
            className="border bg-white mt-6 md:mt-24 mx-auto rounded-lg w-5/6 p-4"
          >
            <div className="text-right">
              <p
                onClick={() => openEditPopup(item)}
                className=" btn bg-blue-600 hover:bg-blue-800 cursor-pointer"
              >
                Edit
              </p>
            </div>
            <div>
              <Modal
                isOpen={isEditOpen}
                onRequestClose={closeEditPopup}
                contentLabel="Edit Popup"
                style={{
                  content: {
                    width: "75%",
                    height: "60%",
                    margin: "auto",
                  },
                }}
              >
                <h1 className="text-center text-xl font-semibold">
                  Edit Profile Information
                </h1>
                <form onSubmit={handleEditSubmit}>
                  <div className="flex flex-col justify-center items-center mx-auto gap-4 md:gap-40 md:flex-row-reverse ">
                    <div>
                      <div className="mt-2 md:mt-3">
                        <label className="block text-sm font-medium">
                          Name
                        </label>
                        <input
                          className="border rounded-md p-2"
                          type="text"
                          value={editedData.name || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mt-2 md:mt-3">
                        <label className="block text-sm font-medium">
                          Email
                        </label>
                        <input
                          className="border rounded-md p-2"
                          type="text"
                          value={editedData.email || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mt-2 md:mt-3">
                        <label className="block text-sm font-medium">
                          profilePicture
                        </label>
                        <input
                          className="border rounded-md p-2"
                          type="text"
                          value={editedData.profilePicture || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              profilePicture: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mt-2 md:mt-3">
                        <label className="block text-sm font-medium">
                          phoneNumber
                        </label>
                        <input
                          className="border rounded-md p-2"
                          type="text"
                          value={editedData.phoneNumber || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              phoneNumber: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mt-2 md:mt-3">
                        <label className="block text-sm font-medium">
                          About
                        </label>
                        <input
                          className="border rounded-md p-2"
                          type="text"
                          value={editedData.about || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              about: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <div className="mt-2 md:mt-3">
                        <label className="block text-sm font-medium">
                          skills
                        </label>
                        <input
                          className="border rounded-md p-2"
                          type="text"
                          value={editedData.skills || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              skills: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mt-2 md:mt-3">
                        <label className="block text-sm font-medium">
                          professionalDetails
                        </label>
                        <input
                          className="border rounded-md p-2"
                          type="text"
                          value={editedData.professionalDetails || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              professionalDetails: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mt-2 md:mt-3">
                        <label className="block text-sm font-medium">
                          certifications
                        </label>
                        <input
                          className="border rounded-md p-2"
                          type="text"
                          value={editedData.certifications || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              certifications: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mt-2 md:mt-3">
                        <label className="block text-sm font-medium">
                          Experience
                        </label>
                        <input
                          className="border rounded-md p-2"
                          type="text"
                          value={editedData.experience || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              experience: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mt-2 md:mt-3">
                        <label className="block text-sm font-medium">
                          Education
                        </label>
                        <input
                          className="border rounded-md p-2"
                          type="text"
                          value={editedData.education || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              education: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mx-auto flex justify-center  items-center">
                    <p className="btn mt-4 mx-4 btn-success" type="submit">
                      Update
                    </p>
                    <p
                      className="btn mt-4 mx-4 btn-warning"
                      onClick={closeEditPopup}
                    >
                      Cancel
                    </p>
                  </div>
                </form>
              </Modal>
            </div>
            <div className="flex justify-between flex-col md:flex-row">
              <div className="md:w-3/5">
                <div className="flex items-center gap-8">
                  <Image
                    src={item.profilePicture}
                    width={200}
                    height={200}
                    alt="Images"
                    className="w-12 md:w-20 h-12 md:h-20 rounded-full"
                  />
                  <p className="border rounded-xl p-2">Upload photo</p>
                </div>
                <div className="border shadow-sm rounded-md  p-4 md:p-6 m-4">
                  <div className="pt-2">
                    <h1 className="font-semibold">Your Name</h1>
                    <p>{item.name}</p>
                  </div>
                  <div className="pt-2">
                    <h1 className="font-semibold">Your Email</h1>
                    <p>{item.email}</p>
                  </div>
                  <div className="pt-2">
                    <h1 className="font-semibold">Your Phone Number</h1>
                    <p>{item.phoneNumber}</p>
                  </div>
                </div>
                <div className="border shadow-sm rounded-md p-4 md:p-6 m-4">
                  <h1 className="font-semibold">About {item.name}</h1>
                  <p>{item.about}</p>
                </div>
                <div className="border shadow-sm rounded-md p-4 md:p-6 m-4">
                  <h1 className="font-semibold">Skills</h1>
                  <p>{item.skills}</p>
                </div>
              </div>
              <div className="md:w-3/5">
                <div className="border shadow-sm rounded-md p-4 md:p-6 m-4">
                  <h1 className="font-semibold">Professional Details</h1>
                  <p>{item.professionalDetails}</p>
                </div>
                <div className="border shadow-sm rounded-full p-4 md:p-6 m-4">
                  <h1 className="font-semibold">Certifications</h1>
                  <p>{item.certifications}</p>
                </div>
                <div className="border shadow-sm rounded-md p-4 md:p-6 m-4">
                  <h1 className="font-semibold">Experience</h1>
                  <p>{item.experience}</p>
                </div>
                <div className="border shadow-sm rounded-md p-4 md:p-6 m-4">
                  <h1 className="font-semibold">Education</h1>
                  <p>{item.education}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;

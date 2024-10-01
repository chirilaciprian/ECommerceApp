import { IoMdClose } from "react-icons/io";
import { ProfileHook } from "../../hooks/authHooks";
import {
  isAuthenticated,
  updateUser,
  UserProps,
} from "../../services/authService";
import { useEffect, useState } from "react";
import { changePassword } from "../../services/userService";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user, setUser } = ProfileHook();
  const [passwordInput, setPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const handleGetUser = async () => {
    try {
      const data = await isAuthenticated();
      console.log("Authenticated data:", data);
      setUser({
        id: data.id,
        email: data.email,
        username: data.username,
        phone: data.phone,
        address: data.address,
        password: data.password,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
      console.log("Updated user:", user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChangePassword = async (
    id: string,
    password: string,
    newPassword: string,
    confirmNewPassword: string
  ) => {
    const res = await changePassword(
      id,
      password,
      newPassword,
      confirmNewPassword
    );
    console.log("Updated user:", res);
  };

  const handleSubmit = async (user: UserProps) => {
    const res = await updateUser(user);
    console.log("Updated user:", res);
  };

  useEffect(() => {
    handleGetUser();
  }, []);
  return (
    <>
      {user !== null ? (
        <div className="min-h-screen w-screen flex justify-center playfair p-4 md:p-8 bg-base-200">
          <div className="flex flex-col items-center m-5 p-5 shadow-md border rounded-xl gap-4 w-full max-w-lg">
            <h1 className="text-3xl">Account settings</h1>
            <div className="flex flex-col gap-4 w-full">
              {/* Username */}
              <div className="flex w-full items-center">
                <span className="btn btn-ghost font-bold merriweather w-32">
                  USERNAME
                </span>
                <input
                  type="text"
                  placeholder="Username"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
              </div>
              {/* Email */}
              <div className="flex w-full items-center">
                <span className="btn btn-ghost font-bold merriweather w-32">
                  EMAIL
                </span>
                <input
                  type="text"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="input input-bordered w-full"
                />
              </div>
              {/* Address */}
              <div className="flex w-full items-center">
                <span className="btn btn-ghost font-bold merriweather w-32">
                  ADDRESS
                </span>
                <input
                  type="text"
                  placeholder="Address"
                  value={user.address}
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
              </div>
              {/* Phone Number */}
              <div className="flex w-full items-center">
                <span className="btn btn-ghost font-bold merriweather w-32">
                  NUMBER
                </span>
                <input
                  type="text"
                  placeholder="Phone number"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="input input-bordered w-full roboto font-light"
                />
              </div>
            </div>
            <button
              className="btn btn-warning btn-block md:text-xl text-lg"
              onClick={() => handleSubmit(user)}
            >
              Save
            </button>

            {/* Modal for changing password */}
            <div>
              <button
                className="btn btn-ghost md:text-lg text-md"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                Change Password
              </button>
              <dialog
                id="my_modal_5"
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box p-6">
                  <div className="modal-action m-0">
                    <form method="dialog">
                      <button className="btn btn-ghost p-1">
                        <IoMdClose className="text-3xl" />
                      </button>
                    </form>
                  </div>
                  <div className="flex flex-col items-center gap-2 w-full py-10">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="input input-bordered w-full"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="input input-bordered w-full"
                      value={newPasswordInput}
                      onChange={(e) => setNewPasswordInput(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="input input-bordered w-full"
                      value={confirmPasswordInput}
                      onChange={(e) => setConfirmPasswordInput(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-warning btn-block md:text-xl text-lg"
                    onClick={() =>
                      handleChangePassword(
                        user.id,
                        passwordInput,
                        newPasswordInput,
                        confirmPasswordInput
                      )
                    }
                  >
                    Save
                  </button>
                </div>
              </dialog>
            </div>
            <Link
              to="/"
              className="text-indigo-600 hover:text-indigo-800 font-semibold text-lg text-center w-full"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      ) : (
        <span>Loading</span>
      )}
    </>
  );
};

export default ProfilePage;

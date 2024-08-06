/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { isAuthenticated } from "../../services/authService";
import { ProfileHook } from "../../hooks/authHooks";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user, setUser } = ProfileHook();
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [addressInput, setAddressInput] = useState("");

  const handleGetUser = async () => {
    try {
      const data = await isAuthenticated();
      console.log("Authenticated data:", data);
      setUser({
        email: data.email,
        username: data.username,
        phone: "My Phone Number",
        address: "Adresa mea",
      });
      console.log("Updated user:", user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-gray-100 via-slate-200 to-zinc-100 ">
        {user.email !== "" ? (
          <div className="bg-gradient-to-b from-slate-200 via-gray-300 to-stone-300 flex flex-col items-start p-16 rounded-lg shadow-md opacity-100 m-0 playfair font-thin gap-2">
            <div>
              <h1 className="text-2xl font-bold">Email:</h1>
              <span className="text-md uppercase roboto font-light">
                {user.email}
              </span>
            </div>

            <div>
              <h1 className="text-2xl font-bold">Username:</h1>
              <span className="text-md uppercase roboto font-light">
                {user.username}
              </span>
            </div>

            <div>
              <h1 className="text-2xl font-bold">Phone:</h1>
              <span className="text-md uppercase roboto font-light">
                {user.phone}
              </span>
            </div>

            <div>
              <h1 className="text-2xl font-bold">Address:</h1>
              <span className="text-md uppercase roboto font-light">
                {user.address}
              </span>

              <p className="text-gray-700 mt-8">
              <Link to="/" className="text-blue-500 text-lg font-bold hover:underline">
                Back to Homepage
              </Link>
            </p>
            </div>

            {/* <div className="flex lg:flex-row gap-5 flex-col mt-5">
              <button
                type="button"
                className="inline-block rounded bg-neutral-800 px-5 pb-1.5 pt-2 text-sm font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                onClick={() => setShowEmailInput(!showEmailInput)}
              >
                Change
                <span className="hidden lg:inline">
                  <br />
                </span>
                Email
              </button>
              {showEmailInput && (
                <input
                  type="email"
                  className="mt-2 p-2 border border-gray-300 rounded"
                  placeholder="Enter new email"
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              )}
              <button
                type="button"
                className="inline-block rounded bg-neutral-800 px-5 pb-1.5 pt-2 text-sm font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                onClick={() => setShowPhoneInput(!showPhoneInput)}
              >
                Change
                <span className="hidden lg:inline">
                  <br />
                </span>
                Phone
              </button>
              {showPhoneInput && (
                <input
                  type="tel"
                  className="mt-2 p-2 border border-gray-300 rounded"
                  placeholder="Enter new phone number"
                  onChange={(e) => setPhoneInput(e.target.value)}
                />
              )}
              <button
                type="button"
                className="inline-block rounded bg-neutral-800 px-5 pb-1.5 pt-2 text-sm font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
                onClick={() => setShowAddressInput(!showAddressInput)}
              >
                Change
                <span className="hidden lg:inline">
                  <br />
                </span>
                Address
              </button>
              {showAddressInput && (
                <input
                  type="text"
                  className="mt-2 p-2 border border-gray-300 rounded"
                  placeholder="Enter new address"
                  onChange={(e) => {
                    setAddressInput(e.target.value);
                  }}
                />
              )}
            </div> */}
            
          </div>
        ) : (
          <div className="items-center flex justify-center playfair">
            <h1 className="text-6xl">Fetching user data...</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;

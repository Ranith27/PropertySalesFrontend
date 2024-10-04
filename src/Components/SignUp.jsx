import React, { useState } from "react";
import { useTheme } from "next-themes"; // Import the theme hook
import Navigationbar from "./Navigationbar";
import { AcmeLogo } from "./AcmeLogo";

export default function Register() {
  const { theme } = useTheme(); // Get the current theme

  const [name, setName] = useState("");
  const [username, setUsername] = useState(""); // New state for username
  const [adhar, setAdhar] = useState(""); // New state for Adhar Card
  const [pincode, setPincode] = useState(""); // New state for Pincode
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState(""); // New state for Contact Number
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [customerType, setCustomerType] = useState("select");
  const [errors, setErrors] = useState({
    name: "",
    username: "", // New error state for username
    adhar: "", // New error state for Adhar
    pincode: "", // New error state for Pincode
    address: "",
    contactNumber: "", // New error state for Contact Number
    password: "",
    confirmPassword: "",
    customerType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Basic form validation logic
  const validateForm = () => {
    let valid = true;
    let formErrors = { ...errors };

    // Name validation
    if (!name) {
      formErrors.name = "Name is required";
      valid = false;
    } else {
      formErrors.name = "";
    }

    // Username validation
    if (!username) {
      formErrors.username = "Username is required";
      valid = false;
    } else {
      formErrors.username = "";
    }

    // Adhar validation
    if (!adhar) {
      formErrors.adhar = "Adhar card is required";
      valid = false;
    } else if (!/^\d{12}$/.test(adhar)) {
      formErrors.adhar = "Adhar card must be 12 digits";
      valid = false;
    } else {
      formErrors.adhar = "";
    }

    // Pincode validation
    if (!pincode) {
      formErrors.pincode = "Pincode is required";
      valid = false;
    } else if (!/^\d{6}$/.test(pincode)) {
      formErrors.pincode = "Pincode must be 6 digits";
      valid = false;
    } else {
      formErrors.pincode = "";
    }

    // Address validation
    if (!address) {
      formErrors.address = "Address is required";
      valid = false;
    } else {
      formErrors.address = "";
    }

    // Contact number validation
    if (!contactNumber) {
      formErrors.contactNumber = "Contact number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(contactNumber)) {
      formErrors.contactNumber = "Contact number must be 10 digits";
      valid = false;
    } else {
      formErrors.contactNumber = "";
    }

    // Password validation
    if (!password) {
      formErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
      valid = false;
    } else {
      formErrors.password = "";
    }

    // Confirm password validation
    if (confirmPassword !== password) {
      formErrors.confirmPassword = "Passwords do not match";
      valid = false;
    } else {
      formErrors.confirmPassword = "";
    }

    // Customer Type validation
    if (customerType === "select") {
      formErrors.customerType = "Customer type is required";
      valid = false;
    } else {
      formErrors.customerType = "";
    }

    setErrors(formErrors);
    return valid;
  };

  // Handle form submission and send to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);

      const apiEndpoint =
        customerType === "Broker"? "http://localhost:5176/api/Registration/Broker":"http://localhost:5176/api/Registration/User";

      const payload = {
        name,
        userName: username,
        adhaarCard: adhar,
        pincode,
        address,
        contactNumber,
        password,
      };

      try {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Registration successful:", data);
        } else {
          console.error("Failed to register:", response.statusText);
        }
      } catch (error) {
        console.error("Error during registration:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div
      className={`min-h-screen bg-cover bg-center relative flex flex-col justify-center items-center ${
        theme === "dark" ? "bg-black " : "bg-white"
      }`}
      style={{
        backgroundImage:
          theme === "dark"
            ? "url('/assets/hero-background-dark.jpg')" // Dark mode background
            : "url('/assets/hero-background-light.jpg')", // Light mode background
      }}
    >
      <div className="absolute inset-0 opacity-50"></div>

      <div
        className={`relative z-20 flex flex-col justify-center items-center px-6 py-12 lg:px-8 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-blue-200 text-gray-900"
        } p-8 rounded-lg shadow-lg space-y-6`}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <AcmeLogo className="mb-4" />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
            Create your account
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ${
                  errors.name ? "ring-red-600 focus:ring-red-600" : "ring-gray-300 focus:ring-indigo-600"
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                  theme === "dark" ? "text-white bg-gray-700" : "text-gray-900 bg-white"
                }`}
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
            </div>
          </div>

          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ${
                  errors.username ? "ring-red-600 focus:ring-red-600" : "ring-gray-300 focus:ring-indigo-600"
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                  theme === "dark" ? "text-white bg-gray-700" : "text-gray-900 bg-white"
                }`}
              />
              {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
            </div>
          </div>

          {/* Adhar Card Input */}
          <div>
            <label htmlFor="adhar" className="block text-sm font-medium leading-6">
              Adhar Card
            </label>
            <div className="mt-2">
              <input
                id="adhar"
                name="adhar"
                type="text"
                value={adhar}
                onChange={(e) => setAdhar(e.target.value)}
                className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ${
                  errors.adhar ? "ring-red-600 focus:ring-red-600" : "ring-gray-300 focus:ring-indigo-600"
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                  theme === "dark" ? "text-white bg-gray-700" : "text-gray-900 bg-white"
                }`}
              />
              {errors.adhar && <p className="text-sm text-red-600">{errors.adhar}</p>}
            </div>
          </div>

          {/* Pincode Input */}
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium leading-6">
              Pincode
            </label>
            <div className="mt-2">
              <input
                id="pincode"
                name="pincode"
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ${
                  errors.pincode ? "ring-red-600 focus:ring-red-600" : "ring-gray-300 focus:ring-indigo-600"
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                  theme === "dark" ? "text-white bg-gray-700" : "text-gray-900 bg-white"
                }`}
              />
              {errors.pincode && <p className="text-sm text-red-600">{errors.pincode}</p>}
            </div>
          </div>

          {/* Address Input */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium leading-6">
              Address
            </label>
            <div className="mt-2">
              <input
                id="address"
                name="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ${
                  errors.address ? "ring-red-600 focus:ring-red-600" : "ring-gray-300 focus:ring-indigo-600"
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                  theme === "dark" ? "text-white bg-gray-700" : "text-gray-900 bg-white"
                }`}
              />
              {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
            </div>
          </div>

          {/* Contact Number Input */}
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium leading-6">
              Contact Number
            </label>
            <div className="mt-2">
              <input
                id="contactNumber"
                name="contactNumber"
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ${
                  errors.contactNumber ? "ring-red-600 focus:ring-red-600" : "ring-gray-300 focus:ring-indigo-600"
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                  theme === "dark" ? "text-white bg-gray-700" : "text-gray-900 bg-white"
                }`}
              />
              {errors.contactNumber && <p className="text-sm text-red-600">{errors.contactNumber}</p>}
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ${
                  errors.password ? "ring-red-600 focus:ring-red-600" : "ring-gray-300 focus:ring-indigo-600"
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                  theme === "dark" ? "text-white bg-gray-700" : "text-gray-900 bg-white"
                }`}
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ${
                  errors.confirmPassword
                    ? "ring-red-600 focus:ring-red-600"
                    : "ring-gray-300 focus:ring-indigo-600"
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                  theme === "dark" ? "text-white bg-gray-700" : "text-gray-900 bg-white"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Customer Type Select */}
          <div>
            <label htmlFor="customerType" className="block text-sm font-medium leading-6">
              Customer Type
            </label>
            <div className="mt-2">
              <select
                id="customerType"
                name="customerType"
                value={customerType}
                onChange={(e) => setCustomerType(e.target.value)}
                className={`block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ${
                  errors.customerType
                    ? "ring-red-600 focus:ring-red-600"
                    : "ring-gray-300 focus:ring-indigo-600"
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                  theme === "dark" ? "text-white bg-gray-700" : "text-gray-900 bg-white"
                }`}
              >
                <option value="select">Select a customer type</option>
                <option value="Broker">Broker</option>
                <option value="Customer">Customer</option>
              </select>
              {errors.customerType && (
                <p className="text-sm text-red-600">{errors.customerType}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

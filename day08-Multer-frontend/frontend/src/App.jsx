import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const App = () => {
  let { register, handleSubmit } = useForm();

  const formSubmit = async (data) => {
    const formdata = new FormData();

    formdata.append("name", data.name);
    formdata.append("email", data.email);

    for (let i = 0; i < data.images.length; i++) {
      formdata.append("images", data.images[i]);
    }

    await axios.post("http://localhost:3000/user", formdata);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>

          <p className="text-sm text-gray-500 mt-2">
            Enter your details and upload your images
          </p>
        </div>

        <form
          onSubmit={handleSubmit(formSubmit)}
          className="flex flex-col gap-5"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>

            <input
              {...register("name")}
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images
            </label>

            <input
              {...register("images")}
              type="file"
              multiple
              className="w-full border border-dashed border-gray-300 rounded-xl p-3 text-sm text-gray-600 cursor-pointer hover:border-blue-400 transition"
            />

            <p className="text-xs text-gray-400 mt-2">
              You can select multiple images
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;

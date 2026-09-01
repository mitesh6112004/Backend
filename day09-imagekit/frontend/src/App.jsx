import React from "react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const App = () => {
  let { handleSubmit, register, reset } = useForm();

  let [url, SetUrl] = useState("");

  let handleForm = async (data) => {
    let formData = new FormData();
    let img = data.image[0];

    formData.append("image", img);

    try {
      let res = await axios.post("http://localhost:3000/user", formData);
      console.log(res.data.imageUrl);
      SetUrl(res.data.imageUrl);

      reset();
    } catch (error) {
      console.log("Error in image upload is -", error);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="bg-blue-400 p-5 rounded-2xl flex flex-col items-center">
        <h1 className="font-bold text-4xl text-white">
          Upload Image and get URL of Image
        </h1>
        <form
          onSubmit={handleSubmit(handleForm)}
          className="pt-5 flex flex-col gap-4"
        >
          <input
            {...register("image", {
              required: true,
            })}
            className="border p-2 rounded-xl"
            type="file"
            name="image"
            id="image"
            placeholder="upload here"
          />

          <button className="bg-red-300 rounded font-medium" type="submit">
            Upload
          </button>
        </form>

        <div className="pt-5">
          {url ? (
            <a href={url} target="_blank">
              {url}
            </a>
          ) : (
            "URL"
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

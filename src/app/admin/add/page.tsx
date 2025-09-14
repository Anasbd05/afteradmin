/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import { supabase } from "@/utils/createClient";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [success, setSuccess] = useState("");

  const addUser = async () => {
    const { error, data } = await supabase
      .from("admin")
      .insert([{ name, email, isSubscribe: subscribe }]); // don't hardcode id

    if (error) {
      console.error("Insert error:", error.message);
    } else {
      console.log(data);
      setSuccess("User have been added successfully");
      setName("");
      setEmail("");
      setSubscribe(false);
    }
  };

  return (
    <main className=" h-screen w-full flex items-center justify-center ">
      <div className="flex flex-col gap-2 w-2/4  rounded-lg border p-4 border-neutral-500 shadow-sm">
        <ul className="flex flex-col gap-0.5">
          <label>FullName</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Your FullName"
            className=" border px-4 py-2 border-neutral-300 rounded-md "
          />
        </ul>
        <ul className="flex flex-col gap-0.5">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Your Email"
            className=" border px-4 py-2 border-neutral-300 rounded-md "
          />
        </ul>
        <ul className="flex flex-col gap-0.5">
          <label>isSubscribe</label>
          <select
            value={subscribe}
            onChange={(e) => setSubscribe(e.target.value === "true")}
            className="mb-2 border border-neutral-300 rounded-md px-4 py-2"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </ul>
        <button
          onClick={addUser}
          className=" py-3 mb-5 bg-white rounded-lg text-black "
        >
          ADD USER
        </button>
        {success && (
          <p className=" text-center text-green-300 text-sm font-semibold">
            {success}
          </p>
        )}
      </div>
    </main>
  );
};

export default page;

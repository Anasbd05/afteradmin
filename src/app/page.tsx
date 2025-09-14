"use client";

import { supabase } from "@/utils/createClient";
import { useEffect, useState } from "react";

export default function Home() {
  const [fetchUser, setFetchUser] = useState([]);

  useEffect(() => {
    const selectUser = async () => {
      const { data, error } = await supabase.from("admin").select("*");
      if (data) {
        setFetchUser(data);
      } else {
        console.log(error);
      }
    };
    selectUser();
  }, []);
  console.log(fetchUser);

  return (
    <section className=" h-screen w-11/12 mx-auto py-20 ">
      <h1 className=" text-2xl font-semibold ">Admin dashboard</h1>
      <div className="overflow-x-auto rounded border mt-10 border-gray-300 shadow-sm">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-200">
              <th className="px-3 py-2 whitespace-nowrap">FullName</th>
              <th className="px-3 py-2 whitespace-nowrap">Email</th>
              <th className="px-3 py-2 whitespace-nowrap">Subscribe</th>
            </tr>
          </thead>

          {fetchUser.map((user) => (
            <tbody key={user.id} className="divide-y divide-gray-200">
              <tr className="*:text-gray-200 *:first:font-medium">
                <td className="px-3 py-2 whitespace-nowrap">{user.name}</td>
                <td className="px-3 py-2 whitespace-nowrap">{user.email} </td>
                <td className="px-3 py-2 text-white ">{user.isSubscribe}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </section>
  );
}

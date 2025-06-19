import React from "react";
import { User } from "@/types/user";

const mockUser: User = {
  id: "1",
  name: "Sophia Carter",
  email: "sophia@example.com",
  role: "user",
  createdAt: "2021-01-01",
};

const mockRequests = [
  {
    title: "Seeking guidance in my career path",
    status: "Open",
    date: "2023-08-15",
  },
  {
    title: "Praying for my family's health and well-being",
    status: "Closed",
    date: "2023-07-22",
  },
  {
    title: "Requesting prayers for a friend in need",
    status: "Open",
    date: "2023-06-10",
  },
];

export default function ProfilePage() {
  return (
    <main className="min-h-screen flex flex-col sm:flex-row">
      {/* Profile Content */}
      <section className="flex-1 p-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your account and app settings</p>
        </div>

        <div className="flex justify-between items-center">

            <div className="mt-8 flex gap-5 items-center">
                <img
                    src="/assets/icons/user.svg"
                    alt="Profile avatar"
                    className="w-24 h-24 rounded-full bg-[#e28743] border p-2"
                />
                <div>
                    <h2 className="text-xl font-semibold mt-4">{mockUser.name}</h2>
                    <p className="text-gray-500 text-sm">Joined in 2021</p>
                </div>
            </div>

          <button className="bg-gray-100 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
            Edit Profile
          </button>
        </div>

        

        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">My Prayer Requests</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">Title</th>
                  <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockRequests.map((req, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2 text-sm text-gray-800">{req.title}</td>
                    <td>
                      <span className="inline-block px-3 py-1 text-xs bg-gray-100 rounded-md font-medium text-gray-700">
                        {req.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-blue-600">{req.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

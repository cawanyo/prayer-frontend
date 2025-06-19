'use client'
import React, { useState } from "react";

import "react-big-calendar/lib/css/react-big-calendar.css";

import eventList from './event'



const currentAssignments = [
  { date: "Jun 10", title: "Help with Anxiety" },
  { date: "Jun 13", title: "Family Reunion" },
  { date: "Jun 14", title: "Health Recovery" },
  { date: "Jun 15", title: "Job Interview" },
];

export default function PrayerCalendarPage() {
  const [events, setEvents] = useState(eventList);

  return (
    <main className=" gap-3  flex flex-col sm:flex-row">
      <div className="max-w-7xl mx-auto grid grid-cols-1 m-5 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Prayer Planning Calendar</h1>
          <p className="text-sm text-gray-600 mb-4">
            Organize prayer team assignments and schedule intercession periods
          </p>

          <div className="rounded-lg overflow-hidden shadow border border-gray-200 p-3">

          </div>
        </div>

        <aside className="bg-white border rounded shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Current Assignments</h2>
            <button className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700">
              + Schedule Prayer
            </button>
          </div>
          <ul className="space-y-2">
            {currentAssignments.map((assignment, index) => (
              <li key={index} className="border p-3 rounded bg-gray-50 hover:shadow">
                <div className="font-medium text-gray-800">{assignment.date}</div>
                <div className="text-sm text-gray-600">{assignment.title}</div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}

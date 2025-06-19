'use client'
import React from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const PrayerSuccessPage = () => {
  const router = useRouter();

  return (
    <div className=" flex flex-col justify-center items-center px-4 text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Prayer Submitted Successfully</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Thank you for submitting your prayer request. We believe in the power of prayer and someone will be praying for you shortly.
      </p>
      <button
        onClick={() => {router.push('/prayer')}}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Submit Another Prayer
      </button>
    </div>
  );
};

export default PrayerSuccessPage;

'use client'
import React from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const PrayerSuccessPage = () => {
  const router = useRouter();

  return (
    <div className=" flex flex-col justify-center items-center px-4 text-center  m-auto">
      <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Prayer Submitted Successfully</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Thank you for submitting your prayer request. We believe in the power of prayer and someone will be praying for you shortly.
      </p>
      <div className=" flex gap-2">
        <Button
          onClick={() => {router.push('/prayer')}}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 "
        >
          Submit Another Prayer
        </Button>
        <Button
          onClick={() => {router.push('/dashboard')}}
          className="bg-gray-400"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default PrayerSuccessPage;

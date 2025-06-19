import React from 'react'
import Header from "@/components/base/Header";
import PrayerForm from '@/components/prayer/PrayerForm';
import Footer from '@/components/base/Footer';

export default function page() {
  return (

      <div className="w-full p-5 md:w-4xl md:mt-3 mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Submit a Prayer Request
          </h1>
          <PrayerForm />
      </div>

  )
}
